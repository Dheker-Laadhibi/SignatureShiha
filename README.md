# ✍️ SignatureShiha - Vérification de signature intelligente avec IA

## 🔍 Description

**SignatureShiha** est une application full-stack basée sur l'intelligence artificielle pour la **vérification automatique de signatures manuscrites**.

Le projet est composé de :
- 🎯 Un **frontend Angular** (`angular-auth-app`) pour gérer l'interface utilisateur (connexion, enregistrement, signature, profils).
- 🔧 Un **backend Django** (`django`) exposant une API REST pour gérer les utilisateurs et la classification IA.
- 🧠 Une **intelligence artificielle entraînée** pour distinguer les signatures **authentiques** (genuine) et **fausses** (forged) avec une précision de **96.97%**.

---

## 🚀 Fonctionnalités principales

- Authentification sécurisée
- Gestion des utilisateurs et profils
- Système de signature numérique
- Intégration IA pour validation ou détection de signature

---

## 📊 Résultats IA

### Accuracy & Loss par époque

| Accuracy                          | Loss                             |
|----------------------------------|----------------------------------|
| ![accuracy](https://github.com/Dheker-Laadhibi/SignatureShiha/assets/xxxxx/accuracy.png)  | ![loss](https://github.com/Dheker-Laadhibi/SignatureShiha/assets/yyyyy/loss.png)          |

### Matrice de confusion (Accuracy: 96.97%)

![confusion_matrix](https://github.com/Dheker-Laadhibi/SignatureShiha/assets/zzzzz/confusion_matrix.png)

---

## 🛠️ Lancement du projet

### ▶️ Frontend Angular

```bash
cd angular-auth-app
npm install
ng serve
