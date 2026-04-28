// Frontend fayllarini backend/public ga nusxalash (deploy uchun)

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dest = path.join(root, 'backend', 'public');

const files = [
  'index.html',
  'foydalanuvchilar.html',
  '404.html',
  'styles.css'
];

const dirs = ['js'];

function copyFile(src, dst) {
  const d = path.dirname(dst);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.copyFileSync(src, dst);
}

function copyDir(srcDir, dstDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir, { recursive: true });
  for (const name of fs.readdirSync(srcDir)) {
    const s = path.join(srcDir, name);
    const d = path.join(dstDir, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else copyFile(s, d);
  }
}

// public papka
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

for (const f of files) {
  const src = path.join(root, f);
  if (fs.existsSync(src)) {
    copyFile(src, path.join(dest, f));
    console.log('  ' + f);
  }
}

for (const d of dirs) {
  const src = path.join(root, d);
  if (fs.existsSync(src)) {
    copyDir(src, path.join(dest, d));
    console.log('  ' + d + '/');
  }
}

// Rasm (ramazon olib tashlangan)
[].forEach(img => {
  const src = path.join(root, img);
  if (fs.existsSync(src)) {
    copyFile(src, path.join(dest, img));
    console.log('  ' + img);
  }
});

console.log('Frontend backend/public ga nusxalandi.');
