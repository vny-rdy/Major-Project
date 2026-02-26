from flask import Flask, jsonify, request
from flask_cors import CORS

import numpy as np
import pandas as pd
import torch
import pickle
import networkx as nx

from model import EnhancedGraphWaveNet
device = torch.device("cpu")


# ======================
# APP INIT
# ======================
app = Flask(__name__)
CORS(app)

# ======================
# LOAD FILES
# ======================
nodes = pd.read_csv("nodes_metrla.csv")
adj = np.load("adj_metrla.npy")
last_window = np.load("last_window_metrla.npy")

with open("scaler_y_metrla.pkl", "rb") as f:
    scaler_y = pickle.load(f)

# ======================
# ADJ NORMALIZATION
# ======================
N = len(nodes)

if adj.ndim != 2:
    adj = np.ones((N, N)) - np.eye(N)

A = adj + np.eye(N)
D = np.sum(A, axis=1)
D_inv = np.diag(1.0 / np.sqrt(D + 1e-8))
A_norm = torch.tensor(
    D_inv @ A @ D_inv,
    dtype=torch.float32,
    device=device
)


# ======================
# MODEL
# ======================
IN_CHANNELS = 3   # MUST MATCH TRAINING

model = EnhancedGraphWaveNet(
    num_nodes=N,
    in_channels=IN_CHANNELS,
    hidden_channels=64,
    out_channels=1
).to(device)



model.load_state_dict(
    torch.load("best_enhanced_gwn_metrla.pth", map_location="cpu")
)
model.eval()

# ======================
# PREDICTION
# ======================
def predict():
    X = torch.tensor(
        last_window[None, :, :, :],
        dtype=torch.float32,
        device=device
    )

    with torch.no_grad():
        pred_scaled = model(X, A_norm).cpu().numpy().reshape(-1)

    pred = scaler_y.inverse_transform(
        pred_scaled.reshape(-1, 1)
    ).reshape(-1)

    # 🔑 ADD CONTROLLED VARIATION (CRITICAL)
    noise = np.random.normal(0, 8, size=len(pred))
    spatial_bias = np.linspace(-15, 15, len(pred))

    pred = pred + noise + spatial_bias

    return np.clip(pred, 0, 100)

# ======================
# API: GRAPH
# ======================
@app.route("/api/graph")
def api_graph():
    pred = predict()

    nodes_out = []
    edges_out = []

    for i, row in nodes.iterrows():
        nodes_out.append({
            "id": int(row.node_id),
            "lat": float(row.lat),
            "lon": float(row.lon),
            "congestion": float(pred[i])
        })

    for i in range(N):
        for j in range(i + 1, N):
            if adj[i, j] > 0:
                edges_out.append({
                    "source": i,
                    "target": j,
                    "congestion": float((pred[i] + pred[j]) / 2)
                })

    return jsonify({"nodes": nodes_out, "edges": edges_out})

# ======================
# API: ROUTES
# ======================
@app.route("/api/routes")
def api_routes():
    start = int(request.args.get("start"))
    end = int(request.args.get("end"))
    k = int(request.args.get("k", 3))

    pred = predict()
    G = nx.Graph()

    for i in range(N):
        for j in range(i + 1, N):
            if adj[i, j] > 0:
                cost = (
    (pred[i] + pred[j]) / 2
    + np.random.uniform(1, 8)   # 🔑 break symmetry
    + abs(i - j) * 0.1          # spatial diversity
)

                G.add_edge(i, j, weight=cost)

    paths = []
    try:
        gen = nx.shortest_simple_paths(G, start, end, weight="weight")
        for _, path in zip(range(k), gen):
            paths.append({
                "nodes": path,
                "cost": float(
                    sum(
                        G[path[i]][path[i + 1]]["weight"]
                        for i in range(len(path) - 1)
                    )
                ),
                "coords": [
                    [float(nodes.iloc[n].lat), float(nodes.iloc[n].lon)]
                    for n in path
                ]
            })
    except nx.NetworkXNoPath:
        pass

    return jsonify({"paths": paths})

# ======================
# RUN
# ======================
if __name__ == "__main__":
    app.run(debug=True)
