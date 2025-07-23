#!/bin/bash

echo "🔐 === EC2 SECURITY DIAGNOSTIC ==="

# Detect distro
OS=$(grep ^ID= /etc/os-release | cut -d= -f2 | tr -d '"')
echo "📦 OS detected: $OS"
echo

# 1. SSH Configuration
echo "🚪 SSH Configuration:"
grep -E '^Port|^PermitRootLogin|^PasswordAuthentication' /etc/ssh/sshd_config
echo

# 2. UFW / FirewallD Status
echo "🛡️ Firewall Status:"
if command -v ufw >/dev/null; then
  echo "→ UFW status:"
  sudo ufw status verbose
elif command -v firewall-cmd >/dev/null; then
  echo "→ firewalld status:"
  sudo firewall-cmd --state
  sudo firewall-cmd --list-all
else
  echo "⚠️ No known firewall tool found (ufw or firewalld)"
fi
echo

# 3. Listening Ports
echo "🌐 Listening Ports:"
sudo netstat -tulnp | grep LISTEN || sudo ss -tulnp | grep LISTEN
echo

# 4. Sudo-capable Users
echo "👥 Users with sudo access:"
if getent group sudo >/dev/null; then
  getent group sudo
elif getent group wheel >/dev/null; then
  getent group wheel
else
  echo "⚠️ No sudo or wheel group found"
fi
echo

# 5. Recent SSH Login Attempts
echo "📜 Recent SSH logins:"
if [[ "$OS" == "ubuntu" || "$OS" == "debian" ]]; then
  sudo tail -n 20 /var/log/auth.log
else
  sudo tail -n 20 /var/log/secure
fi
echo

# 6. System Updates Available
echo "🧼 System updates:"
if [[ "$OS" == "ubuntu" || "$OS" == "debian" ]]; then
  sudo apt update > /dev/null
  apt list --upgradable 2>/dev/null | grep -v "Listing..."
elif [[ "$OS" == "amzn" || "$OS" == "centos" ]]; then
  sudo yum check-update || echo "yum check-update finished."
else
  echo "⚠️ Package manager not detected"
fi
echo

# 7. Node.js version (if installed)
if command -v node >/dev/null; then
  echo "🟢 Node.js version: $(node -v)"
else
  echo "🟢 Node.js not found"
fi
echo

echo "✅ Done. Review output for warnings or insecure settings."
