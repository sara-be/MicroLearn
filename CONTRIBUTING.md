# Contributing to MicroLearn

Thank you for your interest in contributing to MicroLearn! We love your input and want to make contributing to this project as easy and transparent as possible.

## 🌿 Branch Naming Rules

When creating a new branch, please use the following naming convention:

- `feat/feature-name`: For new features or enhancements.
- `fix/bug-fix-name`: For bug fixes.
- `docs/documentation-changes`: For changes to documentation.
- `refactor/refactor-name`: For code refactoring without changing functionality.
- `chore/task-name`: For routine tasks or maintenance.

**Example:** `feat/add-focus-timer` or `fix/repetition-logic`

## 📝 Commit Conventions

We follow the **Conventional Commits** specification. Each commit message should consist of a **type**, an optional **scope**, and a **subject**:

`type(scope): subject`

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Example:** `feat: implement user streak tracking`

## 🚀 How to Contribute

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork to your local machine.
    ```bash
    git clone https://github.com/your-username/MicroLearn.git
    ```
3.  **Create a branch** for your specific contribution using the naming rules above.
    ```bash
    git checkout -b feat/my-cool-feature
    ```
4.  **Develop & Verify**:
    - Make your changes.
    - Run `npm run dev` to verify the functionality.
    - Ensure your code follows the project's style and quality.
5.  **Commit** your changes using conventional commit messages.
    ```bash
    git commit -m "feat: description of the feature"
    ```
6.  **Push** to your fork.
    ```bash
    git push origin feat/my-cool-feature
    ```
7.  **Create a Pull Request (PR)** against the `main` branch of the original repository.

## ✅ Pull Request Policy

- **Single Purpose**: PRs should address a single issue or feature. Large, multi-purpose PRs will be asked to be split.
- **Review Requirement**: At least **1 reviewer** must approve the PR before it can be merged.
- **Integrity**: Ensure the build passes and no linting errors are introduced.
- **Description**: Provide a clear description of what the PR does and why it's needed.

## ⚖️ Code of Conduct

Please be respectful and professional in all your interactions within this project.

---

Happy learning! 🚀
