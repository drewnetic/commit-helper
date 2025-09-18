# 🚀 Commit Helper

A lightweight CLI tool to generate **Conventional Commit** messages automatically.  
Built with **TypeScript**, **functional programming** and **clean architecture principles**.  

---

## ✨ Features
- 🔍 Detects staged files and suggests commit messages.
- 📝 Supports Conventional Commits out of the box (`feat`, `fix`, `docs`, `chore`, `test`, `refactor`).
- ⚡ Zero configuration required.
- 🎛️ Interactive mode to customize commits.
- 🛠️ Extendable with custom rules.

---

## 📦 Installation
```bash
npm install -g commit-helper-ts
```
## 🚀 Usage
```
commit-helper

Example:

? Select commit type: feat
? Scope (optional): auth
? Description: add login validation
✅ Generated commit: feat(auth): add login validation

Or run in auto mode:

commit-helper --auto`

```

## 🧩 Roadmap

- ⬜Initial CLI with file detection

- ⬜Interactive mode

- ⬜Config file support (commit-helper.json)

- ⬜Git hook integration

- ⬜CI/CD with GitHub Actions

## 🤝 Contributing

Contributions are welcome! Please follow Conventional Commits for PR titles.

## 📜 License

MIT License © 2025 [Andrew Souza](https://github.com/drewnetic/commit-helper/blob/main/LICENSE)
