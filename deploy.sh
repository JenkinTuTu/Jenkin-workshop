git add -A && git commit -m "auto update" && git push
#!/usr/bin/env bash
set -e

# ====== 配置区（按需改）======
SITE_URL="https://jenkintutu.github.io/Jenkin-workshop/"  # 你的 Pages 地址
INDEX_FILE="index.html"                                    # 首页文件
POLL_INTERVAL=5                                            # 轮询间隔（秒）
TIMEOUT=180                                                # 最长等待（秒）
# ============================

msg="${1:-auto update}"                                    # 提交说明（可作为脚本第1个参数传入）

# 1) 生成构建时间戳，并写入 index.html 的占位标记
STAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
if grep -q "build:" "$INDEX_FILE"; then
  # macOS 与 Linux sed 兼容处理
  if sed --version >/dev/null 2>&1; then
    sed -i "s|<!-- build: .* -->|<!-- build: ${STAMP} -->|" "$INDEX_FILE"
  else
    sed -i '' "s|<!-- build: .* -->|<!-- build: ${STAMP} -->|" "$INDEX_FILE"
  fi
else
  echo "⚠️  未在 ${INDEX_FILE} 里找到占位标记：<!-- build: AUTO_BUILD_STAMP -->"
  echo "   将在 <head> 尾部自动追加一行。"
  if sed --version >/dev/null 2>&1; then
    sed -i "0,/<\/head>/s|<\/head>|  <!-- build: ${STAMP} -->\n</head>|" "$INDEX_FILE"
  else
    # macOS BSD sed
    perl -0777 -pe "s|</head>|  <!-- build: ${STAMP} -->\n</head>|" -i "$INDEX_FILE"
  fi
fi

# 2) 提交并推送
git add -A
git commit -m "$msg"
git push -u origin main

echo "🚚 已推送到 main，开始检测 Pages 是否发布……"

# 3) 轮询线上首页，直到出现本次构建时间戳
elapsed=0
ok=0
while [ $elapsed -le $TIMEOUT ]; do
  # 加随机参数防缓存
  html="$(curl -fsSL "${SITE_URL}?cb=$(date +%s%N)" || true)"
  if echo "$html" | grep -q "<!-- build: ${STAMP} -->"; then
    ok=1
    break
  fi
  sleep $POLL_INTERVAL
  elapsed=$((elapsed+POLL_INTERVAL))
  echo "⏳ 等待发布中… (${elapsed}s/${TIMEOUT}s)"
done

if [ $ok -eq 1 ]; then
  echo "✅ 发布成功：${SITE_URL}"
  echo "   构建时间戳：${STAMP}"
  exit 0
else
  echo "❌ 超时未检测到新版本上线（${TIMEOUT}s）。"
  echo "   建议检查：Settings → Pages、浏览器控制台 Network/Console、或 Actions 日志。"
  exit 1
fi