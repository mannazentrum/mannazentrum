
# MZdaycare AI Knowledge Base (Cloud Standard)

## 1. Cloud Operational Protocols
- **Data Persistence**: Prioritaskan Firestore. Jangan gunakan `localStorage` untuk data bisnis inti.
- **Media Uploads**: Selalu gunakan Firebase Storage untuk file > 100KB. Simpan downloadURL di Firestore.
- **Visual