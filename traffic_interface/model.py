import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class GraphConv(nn.Module):
    def __init__(self, in_features, out_features):
        super().__init__()
        self.linear = nn.Linear(in_features, out_features)

    def forward(self, x, A):
        out = torch.einsum('ij,bjf->bif', A, x)
        return self.linear(out)

class TemporalBlock(nn.Module):
    def __init__(self, in_channels, out_channels, kernel_size=3, dilation=1):
        super().__init__()
        padding = (kernel_size - 1) * dilation // 2
        self.conv = nn.Conv1d(
            in_channels,
            out_channels,
            kernel_size,
            padding=padding,
            dilation=dilation
        )
        self.bn = nn.BatchNorm1d(out_channels)

    def forward(self, x):
        return F.relu(self.bn(self.conv(x)))

class SpatialAttention(nn.Module):
    def __init__(self, in_dim, hidden_dim):
        super().__init__()
        self.key = nn.Linear(in_dim, hidden_dim)
        self.query = nn.Linear(in_dim, hidden_dim)
        self.value = nn.Linear(in_dim, hidden_dim)
        self.out = nn.Linear(hidden_dim, in_dim)

    def forward(self, x):
        K = self.key(x)
        Q = self.query(x)
        V = self.value(x)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(K.size(-1))
        attn = torch.softmax(scores, dim=-1)
        return self.out(torch.matmul(attn, V))

class EnhancedGraphWaveNet(nn.Module):
    def __init__(self, num_nodes, in_channels, hidden_channels=64, out_channels=1):
        super().__init__()

        # ⬇⬇ EXACT NAMES USED DURING TRAINING ⬇⬇
        self.tblock1 = TemporalBlock(in_channels, hidden_channels, 3, 1)
        self.tblock2 = TemporalBlock(hidden_channels, hidden_channels, 3, 2)

        self.gc1 = GraphConv(hidden_channels, hidden_channels)
        self.gc2 = GraphConv(hidden_channels, hidden_channels // 2)

        # 🔑 hidden_channels//2 = 32 → MUST MATCH CHECKPOINT
        self.att = SpatialAttention(hidden_channels // 2, hidden_channels // 2)

        self.fc = nn.Linear(hidden_channels // 2, out_channels)

    def forward(self, x, A):
        B, N, C, T = x.shape
        x = x.view(B * N, C, T)
        x = self.tblock1(x)
        x = self.tblock2(x)
        x = x.mean(dim=2).view(B, N, -1)
        x = F.relu(self.gc1(x, A))
        x = F.relu(self.gc2(x, A))
        x = x + self.att(x)
        return self.fc(x).squeeze(-1)
