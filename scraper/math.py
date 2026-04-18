import os
import requests
import hashlib
from bs4 import BeautifulSoup
from googlesearch import search
from tqdm import tqdm

BASE_FOLDER = "TU_BCA_MATH_PAPERS"

os.makedirs(BASE_FOLDER, exist_ok=True)

queries = [
    "BCA TU mathematics 1st semester question paper pdf",
    "Tribhuvan University BCA math past paper pdf",
    "TU BCA math mid term question paper",
    "TU BCA math pre board question paper",
    "BCA math model question paper TU Nepal"
]

visited_hashes = set()

# ---------------------------
# UTIL: file hash (avoid duplicates)
# ---------------------------
def get_hash(content):
    return hashlib.md5(content).hexdigest()

# ---------------------------
# SAVE FILE
# ---------------------------
def save_file(content, name):
    file_hash = get_hash(content)

    if file_hash in visited_hashes:
        print("[-] Duplicate skipped")
        return

    visited_hashes.add(file_hash)

    path = os.path.join(BASE_FOLDER, name)

    with open(path, "wb") as f:
        f.write(content)

    print(f"[+] Saved: {name}")

# ---------------------------
# DOWNLOAD FILE (PDF or Drive)
# ---------------------------
def download(url):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        r = requests.get(url, headers=headers, timeout=15)

        content_type = r.headers.get("content-type", "")

        # Normal PDF
        if "pdf" in content_type or url.endswith(".pdf"):
            name = url.split("/")[-1][:60]
            save_file(r.content, name)

        # Google Drive handling
        elif "drive.google.com" in url:
            print("[Drive link detected - skipping raw download]")
            print(url)

    except:
        pass

# ---------------------------
# EXTRACT LINKS FROM PAGE
# ---------------------------
def extract_links(url):
    try:
        r = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(r.text, "html.parser")

        links = set()

        for a in soup.find_all("a", href=True):
            href = a["href"]

            if href.startswith("/"):
                href = url + href

            links.add(href)

        return links

    except:
        return set()

# ---------------------------
# PROCESS WEBSITE
# ---------------------------
def process_site(url):
    print(f"\n[SCAN] {url}")

    links = extract_links(url)

    for link in links:
        if ".pdf" in link or "drive.google.com" in link:
            download(link)

# ---------------------------
# GOOGLE SEARCH LOOP
# ---------------------------
for q in queries:
    print(f"\n========== SEARCHING: {q} ==========")

    for url in search(q, num_results=8):
        process_site(url)

print("\nDONE - COLLECTION FINISHED")