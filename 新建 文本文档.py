import os
import sys

def generate_directory_tree(root_dir, indent=""):
    items = sorted(os.listdir(root_dir))
    filtered_items = [item for item in items if item not in [".git", "node_modules", ".vscode", "__pycache__", ".gitignore","新建 文本文档.py"]]
    
    for i, item in enumerate(filtered_items):
        path = os.path.join(root_dir, item)
        is_last = (i == len(filtered_items) - 1)
        
        if os.path.isdir(path):
            print(f"{indent}{'└── ' if is_last else '├── '}{item}/")
            next_indent = indent + ("    " if is_last else "│   ")
            generate_directory_tree(path, next_indent)
        else:
            print(f"{indent}{'└── ' if is_last else '├── '}{item}")

if __name__ == "__main__":
    start_dir = "." if len(sys.argv) < 2 else sys.argv[1]
    print(f"基于自动机原理的自动售货机系统/")
    generate_directory_tree(start_dir)