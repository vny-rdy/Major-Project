# 🚦 Realtime Urban Traffic Congestion Prediction

This project predicts real-time traffic congestion using ML models and shows results in a web interface.

The backend is built with **Python + Flask**, and the frontend opens via `app.py`.

---

## 📌 1. Requirements

* Python **3.9 or 3.10**
* Windows / Mac / Linux
* pip installed

---

## 📌 2. Clone the Repository

```bash
git clone https://github.com/vny-rdy/Major-Project.git
cd Major-Project/traffic_interface
```

---

## 📌 3. Create Virtual Environment

### Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 📌 4. Install Libraries

If `requirements.txt` exists:

```bash
pip install -r requirements.txt
```

If not, install manually:

```bash
pip install flask numpy pandas scikit-learn torch matplotlib joblib
```

---

## 📌 5. Run the Project

```bash
python app.py
```

You will see something like:

```
Running on http://127.0.0.1:5000
```

Open this link in browser.

👉 `index.html` will load automatically from templates folder.

---

## 📌 6. Important Notes

Do NOT delete these files (needed for model prediction):

* best_enhanced_gwn_metrla.pth
* scaler_X_metrla.pkl
* scaler_y_metrla.pkl
* adj_metrla.npy
* nodes_metrla.csv

---

## 📌 7. If Error Comes

### 🔹 Module not found

Run again:

```bash
pip install -r requirements.txt
```

### 🔹 Torch error

Install CPU version:

```bash
pip install torch torchvision torchaudio
```

---

## 📌 8. Folder Structure

traffic_interface/
│ app.py
│ model.py
│ templates/
│ project/
│ *.pth / *.npy / *.csv
│ README.md

---

## 📌 9. Author

Vinay Reddy – Major Project (Realtime Urban Traffic Congestion Prediction)
