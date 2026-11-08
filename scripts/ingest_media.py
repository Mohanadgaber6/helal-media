import os
import re
import json
import time
import glob
import subprocess
import urllib.request
import urllib.error
import http.cookiejar
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
MANIFEST_PATH = os.path.join(BASE_DIR, "src", "data", "media-manifest.json")
RAW_CACHE_DIR = os.path.join(BASE_DIR, ".media-cache")

def resolve_binary(candidates, fallback):
    for c in candidates:
        if os.path.exists(c):
            return c
    return fallback

FFMPEG_BIN = resolve_binary(
    [
        os.path.join(BASE_DIR, "node_modules", "ffmpeg-static", "ffmpeg.exe"),
        os.path.join(BASE_DIR, "node_modules", "ffmpeg-static", "ffmpeg"),
    ],
    "ffmpeg",
)

FFPROBE_BIN = resolve_binary(
    glob.glob(os.path.join(BASE_DIR, "node_modules", "ffprobe-static", "bin", "**", "ffprobe.exe"), recursive=True)
    + glob.glob(os.path.join(BASE_DIR, "node_modules", "ffprobe-static", "bin", "**", "ffprobe"), recursive=True),
    "ffprobe",
)

DESIGN_ITEMS = [
    # Client 1: Dr. Mohamed Ismail Dental Clinics (5)
    {"id": "design-dr-mohamed-1", "kind": "image", "groupSlug": "dr-mohamed-ismail-dental-clinics", "clientName": "Dr. Mohamed Ismail Dental Clinics", "industry": "Health Care", "credit": "Designed By / Ahmed Maroof", "index": 1, "isLead": True, "sourceUrl": "https://drive.google.com/file/d/1S5YykVj_9tB9aN1TnTigJ7zX1hOHtIDa/view?usp=drive_link"},
    {"id": "design-dr-mohamed-2", "kind": "image", "groupSlug": "dr-mohamed-ismail-dental-clinics", "clientName": "Dr. Mohamed Ismail Dental Clinics", "industry": "Health Care", "credit": "Designed By / Ahmed Maroof", "index": 2, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1nsu_tIQlcUc_DVqNaeR0ZOnojKGNCART/view?usp=drive_link"},
    {"id": "design-dr-mohamed-3", "kind": "image", "groupSlug": "dr-mohamed-ismail-dental-clinics", "clientName": "Dr. Mohamed Ismail Dental Clinics", "industry": "Health Care", "credit": "Designed By / Ahmed Maroof", "index": 3, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1xdzWR9bE1_YJGMGJ5skbu3VV5Oe3ENlf/view?usp=drive_link"},
    {"id": "design-dr-mohamed-4", "kind": "image", "groupSlug": "dr-mohamed-ismail-dental-clinics", "clientName": "Dr. Mohamed Ismail Dental Clinics", "industry": "Health Care", "credit": "Designed By / Ahmed Maroof", "index": 4, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1LJB348dsa_7oeZ7FOUmHZVUWCGL0z-sV/view?usp=drive_link"},
    {"id": "design-dr-mohamed-5", "kind": "image", "groupSlug": "dr-mohamed-ismail-dental-clinics", "clientName": "Dr. Mohamed Ismail Dental Clinics", "industry": "Health Care", "credit": "Designed By / Ahmed Maroof", "index": 5, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1fz8lOruDYwiQbA-C0rvc7QdGcybjh54W/view?usp=drive_link"},
    # Client 2: Ogien Dental Clinic (5)
    {"id": "design-ogien-1", "kind": "image", "groupSlug": "ogien-dental-clinic", "clientName": "Ogien Dental Clinic", "industry": "Health Care", "credit": "Designed By / Omar Abdelrahim", "index": 1, "isLead": True, "sourceUrl": "https://drive.google.com/file/d/1XCaF-ZywZs30pgEOztYC9NUuZ3Nvyp3r/view?usp=drive_link"},
    {"id": "design-ogien-2", "kind": "image", "groupSlug": "ogien-dental-clinic", "clientName": "Ogien Dental Clinic", "industry": "Health Care", "credit": "Designed By / Omar Abdelrahim", "index": 2, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/18TgZTvC1nuDxUpO03HIREmJIpWTP7Hf9/view?usp=drive_link"},
    {"id": "design-ogien-3", "kind": "image", "groupSlug": "ogien-dental-clinic", "clientName": "Ogien Dental Clinic", "industry": "Health Care", "credit": "Designed By / Omar Abdelrahim", "index": 3, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1pXGa0gZDobljC9HKnoscd_iYEP0AAlV2/view?usp=drive_link"},
    {"id": "design-ogien-4", "kind": "image", "groupSlug": "ogien-dental-clinic", "clientName": "Ogien Dental Clinic", "industry": "Health Care", "credit": "Designed By / Omar Abdelrahim", "index": 4, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1U_6SluGRp_yiqQN9pPlBJIMRkJb_MNmq/view?usp=drive_link"},
    {"id": "design-ogien-5", "kind": "image", "groupSlug": "ogien-dental-clinic", "clientName": "Ogien Dental Clinic", "industry": "Health Care", "credit": "Designed By / Omar Abdelrahim", "index": 5, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1d8u-tlTjc4Rmju64paulfOHS7_OZXal-/view?usp=drive_link"},
    # Client 3: Fast Way (5)
    {"id": "design-fast-way-1", "kind": "image", "groupSlug": "fast-way", "clientName": "Fast Way", "industry": "Shipping", "credit": "Designed By / Ahmed Maroof", "index": 1, "isLead": True, "sourceUrl": "https://drive.google.com/file/d/1SK1NoYQ9ATx-NiMoFmdl2iFg2dKb7yVu/view?usp=drive_link"},
    {"id": "design-fast-way-2", "kind": "image", "groupSlug": "fast-way", "clientName": "Fast Way", "industry": "Shipping", "credit": "Designed By / Ahmed Maroof", "index": 2, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1vzRK1GhVcaJNyN_5s_EPQyGvpthMeDIV/view?usp=drive_link"},
    {"id": "design-fast-way-3", "kind": "image", "groupSlug": "fast-way", "clientName": "Fast Way", "industry": "Shipping", "credit": "Designed By / Ahmed Maroof", "index": 3, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1LIhrOZHZxGtW8P4SvqIuHVpZYm5HZOZS/view?usp=drive_link"},
    {"id": "design-fast-way-4", "kind": "image", "groupSlug": "fast-way", "clientName": "Fast Way", "industry": "Shipping", "credit": "Designed By / Ahmed Maroof", "index": 4, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1C5W8D8i7GC1Cr7-JaOV9tCc8yZIE3xzZ/view?usp=drive_link"},
    {"id": "design-fast-way-5", "kind": "image", "groupSlug": "fast-way", "clientName": "Fast Way", "industry": "Shipping", "credit": "Designed By / Ahmed Maroof", "index": 5, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/16rOVoK3Nm9bDUcfHQ5u8LdmojvQK1bzf/view?usp=drive_link"},
    # Client 4: Galaxy Swimming Academy (4)
    {"id": "design-galaxy-1", "kind": "image", "groupSlug": "galaxy-swimming-academy", "clientName": "Galaxy Swimming Academy", "industry": "Sports", "credit": "Designed By / Ahmed Maroof", "index": 1, "isLead": True, "sourceUrl": "https://drive.google.com/file/d/1uiKJevYcADB0lUfdj0XLbdklj-_x0jH_/view?usp=drive_link"},
    {"id": "design-galaxy-2", "kind": "image", "groupSlug": "galaxy-swimming-academy", "clientName": "Galaxy Swimming Academy", "industry": "Sports", "credit": "Designed By / Ahmed Maroof", "index": 2, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1LYQ_9cL5xNqDuvDTNmdV2mJmugxCTXW8/view?usp=drive_link"},
    {"id": "design-galaxy-3", "kind": "image", "groupSlug": "galaxy-swimming-academy", "clientName": "Galaxy Swimming Academy", "industry": "Sports", "credit": "Designed By / Ahmed Maroof", "index": 3, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1tHGONioTfLSi2PWfbb9PR6iRQuCAvs4h/view?usp=drive_link"},
    {"id": "design-galaxy-4", "kind": "image", "groupSlug": "galaxy-swimming-academy", "clientName": "Galaxy Swimming Academy", "industry": "Sports", "credit": "Designed By / Ahmed Maroof", "index": 4, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/18UIhwHoL4KipBcHLG8BOybXIDkXzqzpi/view?usp=drive_link"},
    # Client 5: Yadawy (5)
    {"id": "design-yadawy-1", "kind": "image", "groupSlug": "yadawy", "clientName": "Yadawy", "industry": "Home Decor", "credit": "Designed By / Ahmed Maroof", "index": 1, "isLead": True, "sourceUrl": "https://drive.google.com/file/d/1ImKl_xiTkrIreLoNE9NBWkfRhKg60FJk/view?usp=drive_link"},
    {"id": "design-yadawy-2", "kind": "image", "groupSlug": "yadawy", "clientName": "Yadawy", "industry": "Home Decor", "credit": "Designed By / Ahmed Maroof", "index": 2, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1HpBXG8H8qxucKF1jalU1JX5ZdHTHJbK-/view?usp=drive_link"},
    {"id": "design-yadawy-3", "kind": "image", "groupSlug": "yadawy", "clientName": "Yadawy", "industry": "Home Decor", "credit": "Designed By / Ahmed Maroof", "index": 3, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1ehB37dYdu53NI4fBIC9m83q19DCHumFa/view?usp=drive_link"},
    {"id": "design-yadawy-4", "kind": "image", "groupSlug": "yadawy", "clientName": "Yadawy", "industry": "Home Decor", "credit": "Designed By / Ahmed Maroof", "index": 4, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1QTTj_7XqhPMJrqY7s1MY9-KvOMrqWjNB/view?usp=drive_link"},
    {"id": "design-yadawy-5", "kind": "image", "groupSlug": "yadawy", "clientName": "Yadawy", "industry": "Home Decor", "credit": "Designed By / Ahmed Maroof", "index": 5, "isLead": False, "sourceUrl": "https://drive.google.com/file/d/1WwQmBSCw0HIZsrPza_hLDul10F40ZdBZ/view?usp=drive_link"},
]

VIDEO_ITEMS = [
    # Group 1: Health Care (7)
    {"id": "video-health-care-1", "kind": "video", "groupSlug": "health-care", "industry": "Health Care", "index": 1, "sourceUrl": "https://drive.google.com/file/d/17SV0E9JO4LVoDaoGjTs5nLGL0tON_a-e/view?usp=drive_link"},
    {"id": "video-health-care-2", "kind": "video", "groupSlug": "health-care", "industry": "Health Care", "index": 2, "sourceUrl": "https://drive.google.com/file/d/1Pd6N5ABBFnFUxuH6__vgAwdmSLR7ez12/view?usp=drive_link"},
    {"id": "video-health-care-3", "kind": "video", "groupSlug": "health-care", "industry": "Health Care", "index": 3, "sourceUrl": "https://drive.google.com/file/d/1j8cGcQg0zT9g0agWcN7V4gQXpS4_KC26/view?usp=drive_link"},
    {"id": "video-health-care-4", "kind": "video", "groupSlug": "health-care", "industry": "Health Care", "index": 4, "sourceUrl": "https://drive.google.com/file/d/1h3aUD9TvP-YbkTzf76U8TPJn0zKYcGHx/view?usp=drive_link"},
    {"id": "video-health-care-5", "kind": "video", "groupSlug": "health-care", "industry": "Health Care", "index": 5, "sourceUrl": "https://drive.google.com/file/d/1xB4hpyqi-XdgkAXSgzb-ehr1wMG_lmMx/view?usp=drive_link"},
    {"id": "video-health-care-6", "kind": "video", "groupSlug": "health-care", "industry": "Health Care", "index": 6, "sourceUrl": "https://drive.google.com/file/d/1Bdv-mjIagc7zJ-IRs3aiaB8T2kOWPTlO/view?usp=drive_link"},
    {"id": "video-health-care-7", "kind": "video", "groupSlug": "health-care", "industry": "Health Care", "index": 7, "sourceUrl": "https://drive.google.com/file/d/1SWJ4ot--7suRr-OpfwEtTs2fwSyydmzj/view?usp=drive_link"},
    # Group 2: Shipping (4)
    {"id": "video-shipping-1", "kind": "video", "groupSlug": "shipping", "industry": "Shipping", "index": 1, "sourceUrl": "https://drive.google.com/file/d/1lu-82yaRQRX5MsflZPONwEPtIUsfYv0j/view?usp=drive_link"},
    {"id": "video-shipping-2", "kind": "video", "groupSlug": "shipping", "industry": "Shipping", "index": 2, "sourceUrl": "https://drive.google.com/file/d/1pz_zZ6H0qUE16isMmB7Hc9wtlD35BzZp/view?usp=drive_link"},
    {"id": "video-shipping-3", "kind": "video", "groupSlug": "shipping", "industry": "Shipping", "index": 3, "sourceUrl": "https://drive.google.com/file/d/103IK4_Ezr1GCMmy4rI0aSe4wT87OVaLP/view?usp=drive_link"},
    {"id": "video-shipping-4", "kind": "video", "groupSlug": "shipping", "industry": "Shipping", "index": 4, "sourceUrl": "https://drive.google.com/file/d/1TkmfYnnSu21mpy-PYqKhKyEj1IQKhuHp/view?usp=drive_link"},
    # Group 3: Sports (4)
    {"id": "video-sports-1", "kind": "video", "groupSlug": "sports", "industry": "Sports", "index": 1, "sourceUrl": "https://drive.google.com/file/d/1pttI5qM9ql_yzJojhf4aWfnntS_VnIz8/view?usp=drive_link"},
    {"id": "video-sports-2", "kind": "video", "groupSlug": "sports", "industry": "Sports", "index": 2, "sourceUrl": "https://drive.google.com/file/d/1D7_jAou0D8EsxRXMFlk9kyyKCCxpe4tO/view?usp=drive_link"},
    {"id": "video-sports-3", "kind": "video", "groupSlug": "sports", "industry": "Sports", "index": 3, "sourceUrl": "https://drive.google.com/file/d/1lQEUuaAIWmUGhHmgzqWrUHy2SHn0h0Er/view?usp=drive_link"},
    {"id": "video-sports-4", "kind": "video", "groupSlug": "sports", "industry": "Sports", "index": 4, "sourceUrl": "https://drive.google.com/file/d/1IkhNiBAl9WMKVdyQfHBVGAandZdGTdjM/view?usp=drive_link"},
    # Group 4: Home Decor (4)
    {"id": "video-home-decor-1", "kind": "video", "groupSlug": "home-decor", "industry": "Home Decor", "index": 1, "sourceUrl": "https://drive.google.com/file/d/1Mcz-U6SZyp-7yMcbxDeeOBRi_FREDa77/view?usp=drive_link"},
    {"id": "video-home-decor-2", "kind": "video", "groupSlug": "home-decor", "industry": "Home Decor", "index": 2, "sourceUrl": "https://drive.google.com/file/d/14bxp0txQAYF8PFzvjATRyPId5eHQYfhR/view?usp=drive_link"},
    {"id": "video-home-decor-3", "kind": "video", "groupSlug": "home-decor", "industry": "Home Decor", "index": 3, "sourceUrl": "https://drive.google.com/file/d/1VWSoqxLHFP-h68agTnFiS1qElyHuDaVs/view?usp=drive_link"},
    {"id": "video-home-decor-4", "kind": "video", "groupSlug": "home-decor", "industry": "Home Decor", "index": 4, "sourceUrl": "https://drive.google.com/file/d/1tWrTbD-HxROR1zxf1oFpSq9x_5s-Sd56/view?usp=drive_link"},
    # Group 5: AI Characters (2)
    {"id": "video-ai-characters-1", "kind": "video", "groupSlug": "ai-characters", "industry": "AI Characters", "index": 1, "sourceUrl": "https://drive.google.com/file/d/1CG8brIZL4wPomreok69JYAt2e2eh1bkx/view?usp=drive_link"},
    {"id": "video-ai-characters-2", "kind": "video", "groupSlug": "ai-characters", "industry": "AI Characters", "index": 2, "sourceUrl": "https://drive.google.com/file/d/1wv9346PvajWOwx0_EcTLdny4zwflZs27/view?usp=drive_link"},
]

def extract_drive_id(url: str) -> str:
    m = re.search(r"/d/([a-zA-Z0-9_-]+)", url)
    if not m:
        raise ValueError(f"Could not extract Drive file ID from {url}")
    return m.group(1)

def download_drive_file(file_id: str, dest_raw_path: str):
    """Download file from Google Drive handling large-file virus scan confirmation if needed."""
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    opener.addheaders = [("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")]

    url1 = f"https://drive.google.com/uc?export=download&id={file_id}"
    try:
        resp = opener.open(urllib.request.Request(url1), timeout=60)
    except urllib.error.HTTPError as e:
        return e.code, "text/html", 0, f"HTTP {e.code} from Google Drive ({e.reason})"

    status = resp.status
    content_type = resp.headers.get("Content-Type", "")
    final_url = resp.geturl()

    if "accounts.google.com" in final_url or "ServiceLogin" in final_url:
        return 403, content_type, 0, "Google Drive ACL restricted (redirects to Google Sign-In; 'Anyone with the link' not enabled on source file)"

    # If Google Drive returns an HTML confirmation page (virus scan warning for large files)
    if "text/html" in content_type.lower():
        html_bytes = resp.read()
        html_text = html_bytes.decode("utf-8", errors="ignore")
        if "ServiceLogin" in html_text or "accounts.google.com" in html_text:
            return 403, content_type, 0, "Google Drive ACL restricted (requires Google Account sign-in / permission grant)"

        confirm_url = f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t"
        uuid_match = re.search(r'name="uuid"\s+value="([^"]+)"', html_text)
        if uuid_match:
            confirm_url += f"&uuid={uuid_match.group(1)}"
        resp = opener.open(urllib.request.Request(confirm_url), timeout=120)
        status = resp.status
        content_type = resp.headers.get("Content-Type", "")

    if "text/html" in content_type.lower():
        return status, content_type, 0, "Google Drive ACL restricted (returned HTML login/permission page instead of media bytes)"

    os.makedirs(os.path.dirname(dest_raw_path), exist_ok=True)
    total_bytes = 0
    with open(dest_raw_path, "wb") as f:
        while True:
            chunk = resp.read(65536)
            if not chunk:
                break
            f.write(chunk)
            total_bytes += len(chunk)

    return status, content_type, total_bytes, None

def probe_media(file_path: str):
    """Use ffprobe to inspect width, height, codec, duration, and orientation."""
    cmd = [
        FFPROBE_BIN,
        "-v", "error",
        "-show_entries", "format=duration,format_name:stream=codec_type,codec_name,width,height",
        "-of", "json",
        file_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        return None
    try:
        data = json.loads(res.stdout)
        streams = data.get("streams", [])
        fmt = data.get("format", {})
        video_stream = next((s for s in streams if s.get("codec_type") == "video"), {})
        audio_stream = next((s for s in streams if s.get("codec_type") == "audio"), {})
        w = int(video_stream.get("width", 0) or 0)
        h = int(video_stream.get("height", 0) or 0)
        orientation = "square"
        if w > h:
            orientation = "landscape"
        elif h > w:
            orientation = "portrait"
        return {
            "width": w,
            "height": h,
            "orientation": orientation,
            "codec": video_stream.get("codec_name", "unknown"),
            "audioCodec": audio_stream.get("codec_name", None),
            "duration": float(fmt.get("duration", 0.0) or 0.0),
            "formatName": fmt.get("format_name", "unknown")
        }
    except Exception:
        return None

def process_item(item: dict):
    file_id = extract_drive_id(item["sourceUrl"])
    item_id = item["id"]
    kind = item["kind"]
    group_slug = item["groupSlug"]
    idx = item["index"]

    raw_path = os.path.join(RAW_CACHE_DIR, f"{item_id}_{file_id}.bin")
    record = {
        **item,
        "driveFileId": file_id,
        "status": "pending",
        "httpStatus": None,
        "mimeType": None,
        "rawBytes": 0,
        "optimizedBytes": 0,
        "width": 0,
        "height": 0,
        "orientation": "unknown",
        "codec": None,
        "duration": None,
        "localPath": None,
        "posterPath": None,
        "error": None,
    }

    try:
        if os.path.exists(raw_path) and os.path.getsize(raw_path) > 1024:
            status, ctype, raw_bytes, err = 200, ("image/png" if kind == "image" else "video/mp4"), os.path.getsize(raw_path), None
        else:
            status, ctype, raw_bytes, err = download_drive_file(file_id, raw_path)

        record["httpStatus"] = status
        record["mimeType"] = ctype
        record["rawBytes"] = raw_bytes

        if err or raw_bytes < 512:
            record["status"] = "blocked"
            record["error"] = err or "Empty or invalid payload"
            print(f"[BLOCKED] {record['id']} -> {record['error']}")
            return record

        meta = probe_media(raw_path)
        if not meta or meta["width"] == 0 or meta["height"] == 0:
            record["status"] = "blocked"
            record["error"] = "Failed ffprobe validation (corrupt or unsupported media bytes)"
            print(f"[BLOCKED] {record['id']} -> {record['error']}")
            return record

        record["width"] = meta["width"]
        record["height"] = meta["height"]
        record["orientation"] = meta["orientation"]
        record["codec"] = meta["codec"]
        record["duration"] = round(meta["duration"], 2) if meta["duration"] else None

        if kind == "image":
            out_rel = f"/media/designs/{group_slug}/{group_slug}-{idx:02d}.webp"
            out_abs = os.path.join(PUBLIC_DIR, out_rel.lstrip("/").replace("/", os.sep))
            os.makedirs(os.path.dirname(out_abs), exist_ok=True)

            if not os.path.exists(out_abs) or os.path.getsize(out_abs) < 512:
                scale_filter = "scale='min(1800,iw)':-1" if meta["width"] > 1800 else "null"
                cmd = [
                    FFMPEG_BIN, "-y", "-i", raw_path,
                    "-vf", scale_filter,
                    "-c:v", "libwebp", "-quality", "88",
                    out_abs
                ]
                subprocess.run(cmd, capture_output=True, check=True)

            out_meta = probe_media(out_abs)
            if out_meta and out_meta["width"] > 0:
                record["width"] = out_meta["width"]
                record["height"] = out_meta["height"]
            record["localPath"] = out_rel
            record["optimizedBytes"] = os.path.getsize(out_abs)
            record["status"] = "verified"

        elif kind == "video":
            out_rel = f"/media/videos/{group_slug}/{group_slug}-{idx:02d}.mp4"
            poster_rel = f"/media/posters/{group_slug}/{group_slug}-{idx:02d}-poster.webp"
            out_abs = os.path.join(PUBLIC_DIR, out_rel.lstrip("/").replace("/", os.sep))
            poster_abs = os.path.join(PUBLIC_DIR, poster_rel.lstrip("/").replace("/", os.sep))
            os.makedirs(os.path.dirname(out_abs), exist_ok=True)
            os.makedirs(os.path.dirname(poster_abs), exist_ok=True)

            if not os.path.exists(poster_abs) or os.path.getsize(poster_abs) < 512:
                seek_time = "1.0" if (meta["duration"] or 0) > 1.5 else "0.1"
                poster_cmd = [
                    FFMPEG_BIN, "-y", "-ss", seek_time, "-i", raw_path,
                    "-frames:v", "1", "-vf", "scale='min(1080,iw)':-2",
                    "-c:v", "libwebp", "-quality", "84",
                    poster_abs
                ]
                subprocess.run(poster_cmd, capture_output=True, check=True)

            if not os.path.exists(out_abs) or os.path.getsize(out_abs) < 1024:
                vid_cmd = [
                    FFMPEG_BIN, "-y", "-i", raw_path,
                    "-vf", "scale='min(1080,iw)':-2",
                    "-c:v", "libx264", "-preset", "ultrafast", "-crf", "26",
                    "-pix_fmt", "yuv420p",
                    "-c:a", "aac", "-b:a", "128k",
                    "-movflags", "+faststart",
                    out_abs
                ]
                subprocess.run(vid_cmd, capture_output=True, check=True)

            out_meta = probe_media(out_abs)
            if out_meta and out_meta["width"] > 0:
                record["width"] = out_meta["width"]
                record["height"] = out_meta["height"]
                record["codec"] = out_meta["codec"]
            record["localPath"] = out_rel
            record["posterPath"] = poster_rel
            record["optimizedBytes"] = os.path.getsize(out_abs)
            record["status"] = "verified"

    except Exception as e:
        record["status"] = "blocked"
        record["error"] = str(e)

    print(f"[{record['status'].upper()}] {record['id']} -> {record['localPath']} ({record['width']}x{record['height']}, raw={record['rawBytes']}B, opt={record['optimizedBytes']}B)")
    return record

def main():
    print(f"Using FFMPEG: {FFMPEG_BIN}")
    print(f"Using FFPROBE: {FFPROBE_BIN}")
    os.makedirs(RAW_CACHE_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(MANIFEST_PATH), exist_ok=True)

    all_items = DESIGN_ITEMS + VIDEO_ITEMS
    print(f"Starting media ingestion for {len(all_items)} items (24 designs + 21 videos)...")
    results_map = {}

    with ThreadPoolExecutor(max_workers=4) as pool:
        future_to_id = {pool.submit(process_item, item): item["id"] for item in all_items}
        for future in as_completed(future_to_id):
            rec = future.result()
            results_map[rec["id"]] = rec

    ordered_designs = [results_map[item["id"]] for item in DESIGN_ITEMS]
    ordered_videos = [results_map[item["id"]] for item in VIDEO_ITEMS]

    verified_designs = sum(1 for x in ordered_designs if x["status"] == "verified")
    verified_videos = sum(1 for x in ordered_videos if x["status"] == "verified")

    manifest = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "summary": {
            "totalAssets": len(all_items),
            "designImagesTotal": len(ordered_designs),
            "designImagesVerified": verified_designs,
            "designImagesBlocked": len(ordered_designs) - verified_designs,
            "videosTotal": len(ordered_videos),
            "videosVerified": verified_videos,
            "videosBlocked": len(ordered_videos) - verified_videos,
        },
        "designs": ordered_designs,
        "videos": ordered_videos,
    }

    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print("\n=== MEDIA INGESTION SUMMARY ===")
    print(json.dumps(manifest["summary"], indent=2))

if __name__ == "__main__":
    main()
