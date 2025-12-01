// --- Data tantangan (buggy code + aturan validasi) ---
const challenges = [
  {
    id: 'c1',
    title: 'Struktur Dasar HTML',
    difficulty: 'Mudah',
    description: 'Perbaiki 3 kesalahan penulisan pada struktur HTML',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <tittle>ini adalah bagian nama tab browser</tittle>
</head>
<body
Selamat data dalam Tes Coding HTML DASAR -
ini adalah bagian isi dari website kita
</body>
<html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // 1. Kesalahan: tag <tittle> seharusnya <title>
      if (html.includes('<tittle>') || html.includes('</tittle>')) {
        issues.push('Perbaiki penulisan tag untuk judul tab browser');
      }
      
      // 2. Kesalahan: tag <body> tidak ditutup dengan >
      if (html.includes('<body') && !html.includes('<body>')) {
        issues.push('Perbaiki penulisan tag pembuka body');
      }
      
      // 3. Kesalahan: tag penutup </html> salah
      if (!html.includes('</html>')) {
        issues.push('Perbaiki penulisan tag penutup HTML');
      }
      
      // Cek konten body
      const body = doc.body;
      const bodyContent = body ? body.textContent : '';
      if (!bodyContent.includes('Selamat data dalam Tes Coding HTML DASAR')) {
        issues.push('Pastikan konten body ditampilkan dengan benar');
      }
      
      return issues;
    }
  },
  {
    id: 'c2',
    title: 'Heading HTML',
    difficulty: 'Sedang',
    description: 'Perbaiki kesalahan heading dan tambahkan heading untuk nama lengkap',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <title>Tes 2 - heading</title>
</head>
<body>
SMAN 2 PADALARANG
<h2>saat ini saya sedang melaksanakan tes coding dasar html</h3>


</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // 1. SMAN 2 PADALARANG harus menggunakan heading terbesar (h1)
      const h1 = doc.querySelector('h1');
      if (!h1 || !h1.textContent.includes('SMAN 2 PADALARANG')) {
        issues.push('Jadikan tulisan "SMAN 2 PADALARANG" dengan heading H1');
      }
      
      // 2. Cek kesalahan penulisan tag heading
      const hasIncorrectHeading = html.includes('<h2>saat ini saya sedang melaksanakan tes coding dasar html</h3>');
      
      const h2Elements = doc.querySelectorAll('h2');
      let correctH2Found = false;
      
      h2Elements.forEach(h2 => {
        if (h2.textContent.trim() === 'saat ini saya sedang melaksanakan tes coding dasar html') {
          correctH2Found = true;
        }
      });
      
      if (hasIncorrectHeading || !correctH2Found) {
        issues.push('Perbaiki penulisan pada bagian Tag Penutup anda masih ada yang salah');
      }
      
      // 3. Harus ada heading h5 dengan nama lengkap
      const h5 = doc.querySelector('h5');
      if (!h5 || h5.textContent.trim().length < 3) {
        issues.push('Tambahkan heading H5 yang berisi nama lengkap Anda');
      }
      
      // Validasi tambahan: pastikan tidak ada teks SMAN 2 PADALARANG tanpa tag
      const bodyHTML = doc.body.innerHTML;
      if (bodyHTML.includes('SMAN 2 PADALARANG') && !bodyHTML.includes('<h1>SMAN 2 PADALARANG</h1>')) {
        issues.push('Tulisan "SMAN 2 PADALARANG" harus berada dalam tag heading H1');
      }
      
      return issues;
    }
  },
  {
    id: 'c3',
    title: 'Paragraf HTML',
    difficulty: 'Sedang',
    description: 'Perbaiki kesalahan tag paragraf dan tambahkan paragraf baru',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <title>Tes 3 - Paragraf</title>
</head>
<body>

<h1>SAYANGI BUMI</h1>
<p>Bumi Sebagai Amanah - Bumi terhampar luas sebagai karunia Ilahi yang agung, Menjaganya adalah wujud syukur atas kuasa Sang Pencipta.
<p>Kesucian Alam - Setiap ciptaan Tuhan di alam semesta ini memiliki kesucian, Merawatnya adalah ibadah, merusaknya adalah dosa.<p/>
<p>Janji Pertanggungjawaban - Kita akan dimintai pertanggungjawaban atas apa yang telah kita gunakan, Perlakukan Bumi dengan baik, karena kita adalah khalifah-Nya di dunia.</p>

</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // 1. Cek paragraf pertama - belum ditutup dengan </p>
      const firstParagraph = doc.querySelectorAll('p')[0];
      if (!firstParagraph || !html.includes('<p>Bumi Sebagai Amanah') || html.includes('<p>Bumi Sebagai Amanah') && !html.includes('</p>', html.indexOf('<p>Bumi Sebagai Amanah'))) {
        issues.push('Lengkapi tag paragraf pertama yang belum ditutup dengan benar');
      }
      
      // 2. Cek kesalahan penulisan sintak - tag penutup salah <p/> seharusnya </p>
      if (html.includes('<p/>')) {
        issues.push('Perbaiki kesalahan penulisan sintak tag paragraf');
      }
      
      // 3. Cek apakah ada paragraf tambahan dengan konten yang diminta
      const paragraphs = doc.querySelectorAll('p');
      let additionalParagraphFound = false;
      
      paragraphs.forEach(p => {
        if (p.textContent.includes('BUMIKU AKU SAYANG PADAMU')) {
          additionalParagraphFound = true;
        }
      });
      
      if (!additionalParagraphFound) {
        issues.push('Tambahkan 1 paragraf dengan tulisan "BUMIKU AKU SAYANG PADAMU"');
      }
      
      // Validasi tambahan: pastikan semua paragraf ditutup dengan benar
      const pTags = html.split('<p>').length - 1;
      const closingPTags = html.split('</p>').length - 1;
      if (pTags !== closingPTags) {
        issues.push('Pastikan semua tag paragraf dibuka dan ditutup dengan benar');
      }
      
      return issues;
    }
  },
  {
    id: 'c4',
    title: 'Teks Berjalan dan Garis Lurus',
    difficulty: 'Sedang',
    description: 'Tambahkan garis horizontal dan buat teks bergerak',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <title>Tes 4 - Teks Berjalan dan Garis</title>
</head>
<body>
<h1>BELAJAR MEMBUAT TEKS BERJALAN DAN GARIS PANJANG </h1>
<p>teks ini seharusnya berjalan ke kiri</p>
<p>teks ini berjalan ke arah kanan</p>

</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // 1. Cek apakah ada garis horizontal setelah judul H1
      const h1 = doc.querySelector('h1');
      let hrAfterH1 = false;
      
      if (h1) {
        const nextElement = h1.nextElementSibling;
        if (nextElement && nextElement.tagName === 'HR') {
          hrAfterH1 = true;
        }
      }
      
      // Juga cek di HTML asli untuk memastikan
      if (!hrAfterH1 && !html.includes('</h1>') || (html.includes('</h1>') && !html.includes('<hr>', html.indexOf('</h1>')))) {
        issues.push('Tambahkan garis lurus (horizontal rule) setelah judul H1');
      }
      
      // 2. Cek teks pertama bergerak ke kiri (marquee dengan direction="left")
      const marqueeLeft = doc.querySelector('marquee[direction="left"]');
      if (!marqueeLeft || !marqueeLeft.textContent.includes('teks ini seharusnya berjalan ke kiri')) {
        issues.push('Tambahkan tag marquee dengan direction="left" untuk teks pertama');
      }
      
      // 3. Cek teks kedua bergerak ke kanan (marquee dengan direction="right")
      const marqueeRight = doc.querySelector('marquee[direction="right"]');
      if (!marqueeRight || !marqueeRight.textContent.includes('teks ini berjalan ke arah kanan')) {
        issues.push('Tambahkan tag marquee dengan direction="right" untuk teks kedua');
      }
      
      return issues;
    }
  },
  {
    id: 'c5',
    title: 'Warna Latar Belakang',
    difficulty: 'Mudah',
    description: 'Berikan warna latar belakang ungu pada halaman',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <title>Tes 5 - Warna Latar Belakang</title>
</head>
<body>
  <h1>BELAJAR MEMBERIKAN WARNA LATAR BELAKANG</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // Cek apakah body memiliki warna latar belakang ungu
      const body = doc.body;
      const bodyStyle = body.getAttribute('style') || '';
      const bodyBgColor = body.getAttribute('bgcolor') || '';
      
      // Cek berbagai kemungkinan warna ungu
      const hasPurpleBackground = 
        bodyStyle.toLowerCase().includes('purple') ||
        bodyStyle.toLowerCase().includes('#800080') ||
        bodyStyle.toLowerCase().includes('#9370db') ||
        bodyStyle.toLowerCase().includes('#8b008b') ||
        bodyStyle.toLowerCase().includes('#9932cc') ||
        bodyBgColor.toLowerCase().includes('purple') ||
        bodyBgColor.toLowerCase().includes('#800080') ||
        bodyBgColor.toLowerCase().includes('#9370db') ||
        bodyBgColor.toLowerCase().includes('#8b008b') ||
        bodyBgColor.toLowerCase().includes('#9932cc');
      
      if (!hasPurpleBackground) {
        issues.push('Berikan warna latar belakang ungu pada halaman');
      }
      
      return issues;
    }
  },
  {
    id: 'c6',
    title: 'Warna Tulisan',
    difficulty: 'Sedang',
    description: 'Ubah warna tulisan pada judul dan paragraf',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Test 6 - Warna Tulisan</title>
</head>
<body>
<h1>Jagalah Adab</h1>
<p>
Adab adalah cermin hati dan budi pekerti kita yang sesungguhnya. Ia lebih berharga dari ilmu, karena ia menentukan cara kita menghormati dan berinteraksi dengan orang lain. Adab yang baik membuka pintu rezeki dan kasih sayang.
</p>
<p>
Menjaga adab berarti selalu bersikap rendah hati dan sopan dalam perkataan maupun perbuatan. Hormati yang tua, sayangi yang muda, dan selalu ucapkan kata ajaib: terima kasih dan maaf. Ini menciptakan keharmonisan di mana pun kita berada.
</p>
<p>
Adab adalah warisan budaya yang harus terus dipegang teguh. Jadikanlah kesopanan sebagai pakaian sehari-hari agar martabat diri dan keluarga senantiasa terjaga. Beradab adalah bukti kedewasaan jiwa.
</p>
</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // Helper function untuk cek warna dengan berbagai format
      const checkElementColor = (element, expectedColors) => {
        if (!element) return false;
        
        // Cek warna di element itu sendiri
        const checkSingleElement = (el) => {
          const colorAttr = el.getAttribute('color') || '';
          const styleAttr = el.getAttribute('style') || '';
          
          // Cek di atribut color
          for (const color of expectedColors) {
            if (colorAttr.toLowerCase().includes(color.toLowerCase())) {
              return true;
            }
          }
          
          // Cek di style attribute
          for (const color of expectedColors) {
            const colorPatterns = [
              `color:${color}`,
              `color: ${color}`,
              `color:${color};`,
              `color: ${color};`
            ];
            for (const pattern of colorPatterns) {
              if (styleAttr.toLowerCase().includes(pattern.toLowerCase())) {
                return true;
              }
            }
          }
          
          // Cek computed style
          if (window.getComputedStyle) {
            const computedStyle = getComputedStyle(el);
            const computedColor = computedStyle.color;
            
            // Cek apakah computed color sesuai dengan expected
            for (const color of expectedColors) {
              const colorLower = color.toLowerCase();
              if (colorLower === 'red' || colorLower === '#ff0000' || colorLower === '#f00' || 
                  colorLower === 'rgb(255,0,0)' || colorLower === 'rgb(255, 0, 0)') {
                if (computedColor.includes('255, 0, 0') || computedColor.includes('255,0,0') || 
                    computedColor.includes('#ff0000')) {
                  return true;
                }
              }
              if (colorLower === 'blue' || colorLower === '#0000ff' || colorLower === '#00f' || 
                  colorLower === 'rgb(0,0,255)' || colorLower === 'rgb(0, 0, 255)') {
                if (computedColor.includes('0, 0, 255') || computedColor.includes('0,0,255') || 
                    computedColor.includes('#0000ff')) {
                  return true;
                }
              }
              if (colorLower === 'green' || colorLower === '#008000' || colorLower === '#00ff00' || 
                  colorLower === '#0f0' || colorLower === 'rgb(0,128,0)' || colorLower === 'rgb(0, 128, 0)' ||
                  colorLower === 'rgb(0,255,0)' || colorLower === 'rgb(0, 255, 0)') {
                if (computedColor.includes('0, 128, 0') || computedColor.includes('0,128,0') || 
                    computedColor.includes('0, 255, 0') || computedColor.includes('0,255,0') ||
                    computedColor.includes('#008000') || computedColor.includes('#00ff00')) {
                  return true;
                }
              }
              if (colorLower === 'yellow' || colorLower === '#ffff00' || colorLower === '#ff0' || 
                  colorLower === 'rgb(255,255,0)' || colorLower === 'rgb(255, 255, 0)') {
                if (computedColor.includes('255, 255, 0') || computedColor.includes('255,255,0') || 
                    computedColor.includes('#ffff00')) {
                  return true;
                }
              }
            }
          }
          
          return false;
        };
        
        // Cek element itu sendiri
        if (checkSingleElement(element)) {
          return true;
        }
        
        // Cek parent elements (untuk case: <font color="red"><h1>text</h1></font>)
        let parent = element.parentElement;
        while (parent) {
          if (checkSingleElement(parent)) {
            return true;
          }
          parent = parent.parentElement;
        }
        
        // Cek child elements (untuk case: <h1><font color="red">text</font></h1>)
        const childElements = element.querySelectorAll('*');
        for (const child of childElements) {
          if (checkSingleElement(child)) {
            return true;
          }
        }
        
        return false;
      };
      
      // 1. Cek warna judul H1 harus merah
      const h1 = doc.querySelector('h1');
      if (!h1) {
        issues.push('Judul H1 tidak ditemukan');
      } else {
        const hasRedColor = checkElementColor(h1, ['red', '#ff0000', '#f00', 'rgb(255,0,0)', 'rgb(255, 0, 0)']);
        if (!hasRedColor) {
          issues.push('Ubah warna tulisan judul menjadi merah');
        }
      }
      
      // 2. Cek warna paragraf 1 harus biru
      const paragraphs = doc.querySelectorAll('p');
      if (paragraphs.length < 1) {
        issues.push('Paragraf 1 tidak ditemukan');
      } else {
        const p1 = paragraphs[0];
        const hasBlueColor = checkElementColor(p1, ['blue', '#0000ff', '#00f', 'rgb(0,0,255)', 'rgb(0, 0, 255)']);
        if (!hasBlueColor) {
          issues.push('Ubah warna tulisan paragraf 1 menjadi biru');
        }
      }
      
      // 3. Cek warna paragraf 2 harus hijau
      if (paragraphs.length < 2) {
        issues.push('Paragraf 2 tidak ditemukan');
      } else {
        const p2 = paragraphs[1];
        const hasGreenColor = checkElementColor(p2, [
          'green', '#008000', '#00ff00', '#0f0', 
          'rgb(0,128,0)', 'rgb(0, 128, 0)', 
          'rgb(0,255,0)', 'rgb(0, 255, 0)'
        ]);
        if (!hasGreenColor) {
          issues.push('Ubah warna tulisan paragraf 2 menjadi hijau');
        }
      }
      
      // 4. Cek warna paragraf 3 harus kuning
      if (paragraphs.length < 3) {
        issues.push('Paragraf 3 tidak ditemukan');
      } else {
        const p3 = paragraphs[2];
        const hasYellowColor = checkElementColor(p3, ['yellow', '#ffff00', '#ff0', 'rgb(255,255,0)', 'rgb(255, 255, 0)']);
        if (!hasYellowColor) {
          issues.push('Ubah warna tulisan paragraf 3 menjadi kuning');
        }
      }
      
      return issues;
    }
  },
  {
    id: 'c7',
    title: 'Mengetengahkan Teks',
    difficulty: 'Mudah',
    description: 'Pastikan kedua judul berada di posisi tengah',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <title>Test 7 - Mengetengahkan Teks</title>
</head>
<body>

<h1>JUDUL 1</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<h1>JUDUL 2</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // Helper function untuk cek apakah element berada di tengah
      const isElementCentered = (element) => {
        if (!element) return false;
        
        // Fungsi untuk cek apakah sebuah node memiliki text "JUDUL 1" atau "JUDUL 2"
        const hasCorrectText = (node) => {
          const text = node.textContent.trim();
          return text === 'JUDUL 1' || text === 'JUDUL 2';
        };
        
        // Fungsi untuk cek center pada element
        const checkElementForCenter = (el) => {
          // Cek tag center
          if (el.tagName === 'CENTER') {
            return true;
          }
          
          // Cek atribut align
          const alignAttr = el.getAttribute('align');
          if (alignAttr && alignAttr.toLowerCase() === 'center') {
            return true;
          }
          
          // Cek style attribute
          const styleAttr = el.getAttribute('style') || '';
          const styleLower = styleAttr.toLowerCase();
          if (styleLower.includes('text-align:center') || 
              styleLower.includes('text-align: center') ||
              styleLower.includes('align:center') ||
              styleLower.includes('align: center')) {
            return true;
          }
          
          // Cek computed style
          if (window.getComputedStyle) {
            const computedStyle = getComputedStyle(el);
            const textAlign = computedStyle.textAlign;
            if (textAlign === 'center') {
              return true;
            }
          }
          
          return false;
        };
        
        // Cek element itu sendiri
        if (checkElementForCenter(element) && hasCorrectText(element)) {
          return true;
        }
        
        // Cek parent elements - termasuk jika element berada di dalam <center>
        let parent = element;
        while (parent) {
          if (checkElementForCenter(parent)) {
            // Pastikan parent ini mengandung element kita yang memiliki text yang benar
            const childNodes = Array.from(parent.childNodes);
            for (const child of childNodes) {
              if (child.nodeType === 1 && child.contains(element) && hasCorrectText(element)) {
                return true;
              }
            }
          }
          parent = parent.parentElement;
        }
        
        // Cek child elements - khusus untuk <h1><center>JUDUL 2</center></h1>
        const childElements = element.children;
        for (const child of childElements) {
          if (checkElementForCenter(child)) {
            // Cek apakah child ini mengandung text yang benar
            if (hasCorrectText(element) || hasCorrectText(child)) {
              return true;
            }
          }
          
          // Cek nested children
          const nestedCenters = child.querySelectorAll('center');
          for (const center of nestedCenters) {
            if (hasCorrectText(center) || hasCorrectText(element)) {
              return true;
            }
          }
        }
        
        // Cek khusus untuk <h1><center>JUDUL 2</center></h1>
        // Cari semua tag center di dalam dokumen
        const allCenters = doc.querySelectorAll('center');
        for (const center of allCenters) {
          if (hasCorrectText(center)) {
            // Cek apakah center ini berada di dalam h1 yang kita cek
            if (center.parentElement === element || element.contains(center)) {
              return true;
            }
          }
        }
        
        return false;
      };
      
      // Cari semua h1 elements
      const h1Elements = Array.from(doc.querySelectorAll('h1'));
      
      // Filter hanya h1 yang memiliki text "JUDUL 1" atau "JUDUL 2"
      const judul1Elements = h1Elements.filter(h1 => 
        h1.textContent.trim() === 'JUDUL 1' || 
        h1.innerHTML.includes('JUDUL 1')
      );
      
      const judul2Elements = h1Elements.filter(h1 => 
        h1.textContent.trim() === 'JUDUL 2' || 
        h1.innerHTML.includes('JUDUL 2')
      );
      
      // 1. Cek judul pertama (JUDUL 1) berada di tengah
      if (judul1Elements.length === 0) {
        issues.push('Judul 1 dengan teks "JUDUL 1" tidak ditemukan');
      } else {
        let judul1Centered = false;
        for (const h1 of judul1Elements) {
          if (isElementCentered(h1)) {
            judul1Centered = true;
            break;
          }
        }
        
        if (!judul1Centered) {
          issues.push('Judul 1 harus berada di posisi tengah');
        }
      }
      
      // 2. Cek judul kedua (JUDUL 2) berada di tengah
      if (judul2Elements.length === 0) {
        issues.push('Judul 2 dengan teks "JUDUL 2" tidak ditemukan');
      } else {
        let judul2Centered = false;
        for (const h1 of judul2Elements) {
          if (isElementCentered(h1)) {
            judul2Centered = true;
            break;
          }
        }
        
        if (!judul2Centered) {
          issues.push('Judul 2 harus berada di posisi tengah');
        }
      }
      
      return issues;
    }
  },
  {
    id: 'c8',
    title: 'Membuat Tabel',
    difficulty: 'Sedang',
    description: 'Perbaiki struktur tabel dan tambahkan data baru',
    buggy: `<!DOCTYPE html>
<html lang="id">
<head>
    <title>Test 8 - Membuat Tabel</title>
</head>
<body>

    <h2>Daftar Nama Siswa Kelas XI tl INFORMATIKA</h2>

    <table>
        
            <tr>
                <td>No.</te>
                <td>NIS</td>
                <td>Nama Siswa</td>
                <td>Kelas</td>
            </tr>
            <tr>
                <td>1</td>
                <td>12345</td>
                <td>Ayu Lestari</td>
                <td>XI MIPA 1</td>
            </tr>
            <tr>
                <td>2</td>
                <td>12346</td>
                <td>Bima Sakti</td>
                <td>XI IPS 2</td>
            </tr>
            <tr>
                <td>3</td>
                <td>12347</td>
                <td>Citra Dewi</td>
                <td>XI MIPA 1</td>
            </tr>
        
    </table>

</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // 1. Cek apakah tabel memiliki border
      const table = doc.querySelector('table');
      if (!table) {
        issues.push('Tabel tidak ditemukan');
      } else {
        const tableBorder = table.getAttribute('border') || '';
        const tableStyle = table.getAttribute('style') || '';
        const hasBorder = 
          tableBorder.includes('1') ||
          tableStyle.includes('border:') ||
          tableStyle.includes('border-collapse:');
        
        if (!hasBorder) {
          issues.push('Tambahkan border pada tabel agar garis terlihat');
        }
      }
      
      // 2. Cek apakah menggunakan <th> untuk header
      const thElements = doc.querySelectorAll('th');
      if (thElements.length === 0) {
        issues.push('Gunakan tag <th> untuk header tabel (No, NIS, Nama Siswa, Kelas)');
      } else {
        // Cek apakah header lengkap
        const headerTexts = Array.from(thElements).map(th => th.textContent.trim());
        const requiredHeaders = ['No.', 'NIS', 'Nama Siswa', 'Kelas'];
        const hasAllHeaders = requiredHeaders.every(header => 
          headerTexts.some(text => text.includes(header))
        );
        
        if (!hasAllHeaders) {
          issues.push('Pastikan semua header tabel menggunakan tag <th>');
        }
      }
      
      // 3. Cek apakah ada baris ke-4 dengan nama siswa (data tambahan)
      const tableRows = doc.querySelectorAll('table tr');
      if (tableRows.length < 5) { // Header + 4 baris data
        issues.push('Tambahkan 1 baris data baru pada baris ke-4 dengan nama Anda');
      } else {
        // Cek baris ke-4 (index 4 karena index 0 adalah header)
        const fourthRow = tableRows[4];
        if (fourthRow) {
          const cells = fourthRow.querySelectorAll('td');
          const hasNameCell = Array.from(cells).some(cell => 
            cell.textContent.trim().length >= 3 // Nama minimal 3 karakter
          );
          
          if (!hasNameCell) {
            issues.push('Baris ke-4 harus berisi data dengan nama Anda');
          }
        }
      }
      
      // Validasi tambahan: perbaikan kesalahan tag
      if (html.includes('<td>No.</te>')) {
        issues.push('Perbaiki kesalahan penulisan tag pada kolom No');
      }
      
      return issues;
    }
  },
  {
    id: 'c9',
    title: 'Hyperlink',
    difficulty: 'Mudah',
    description: 'Perbaiki link YouTube dan tambahkan link Google',
    buggy: `<!DOCTYPE html>
<html>
<head>
  <title>Test 9 - Hyperlink</title>
</head>
<body>
  <h1>Daftar Link Media Sosial</h1>
  <hr>
  <p><a hreff=www.youtube.com>Link Youtube</p>
</body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // 1. Cek link YouTube sudah benar dan bisa diklik
      const allLinks = doc.querySelectorAll('a');
      let youtubeLink = null;
      let googleLink = null;
      
      // Cari link YouTube dan Google
      allLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        const linkHref = link.getAttribute('href') || '';
        
        if (linkText.includes('youtube') || linkHref.includes('youtube')) {
          youtubeLink = link;
        }
        if (linkText.includes('google') || linkHref.includes('google')) {
          googleLink = link;
        }
      });
      
      if (!youtubeLink) {
        issues.push('Link YouTube tidak ditemukan');
      } else {
        const youtubeHref = youtubeLink.getAttribute('href') || '';
        const hasValidYoutubeLink = 
          youtubeHref.includes('https://www.youtube.com') ||
          youtubeHref.includes('http://www.youtube.com') ||
          youtubeHref.includes('www.youtube.com');
        
        if (!hasValidYoutubeLink) {
          issues.push('Perbaiki penulisan link YouTube agar dapat diklik');
        }
      }
      
      // 2. Cek apakah ada link Google
      if (!googleLink) {
        issues.push('Tambahkan 1 link yang menuju ke halaman Google');
      } else {
        const googleHref = googleLink.getAttribute('href') || '';
        const hasValidGoogleLink = 
          googleHref.includes('https://www.google.com') ||
          googleHref.includes('http://www.google.com') ||
          googleHref.includes('www.google.com');
        
        if (!hasValidGoogleLink) {
          issues.push('Pastikan link Google dapat diklik dan menuju ke www.google.com');
        }
      }
      
      // Validasi tambahan: perbaikan kesalahan penulisan
      if (html.includes('hreff=')) {
        issues.push('Perbaiki kesalahan penulisan atribut href pada link');
      }
      
      return issues;
    }
  },
  {
    id: 'c10',
    title: 'Misi 10: Detektif HTML - Temukan 5 Kesalahan',
    difficulty: 'Sulit',
    description: 'Analisis kode berikut dan temukan 5 kesalahan penulisan HTML!',
    buggy: `<!DOCTYPE html>
<html>
<head>
    <title>MISI TERAKHIR<title>
</head>
<body bgcolor=#e6ffe6>

    <h1><font color="darkgreen">Jagalah Hutan dari Kehancuran</font></h1>
    <hr>

    <p><fontcolor="black">
        Hutan adalah paru-paru dunia yang menyediakan oksigen bagi kehidupan. 
        Tanpa hutan, keseimbangan ekosistem akan terganggu dan banyak spesies 
        akan kehilangan habitatnya. Oleh karena itu, menjaga hutan dari 
        kehancuran adalah tanggung jawab kita bersama.
    </font></p>

    <p><fontcolor="black">
        Salah satu ancaman terbesar bagi hutan adalah penebangan liar dan 
        alih fungsi lahan. Aktivitas ini tidak hanya merusak lingkungan, 
        tetapi juga mempercepat perubahan iklim. Kita perlu mendukung 
        kebijakan yang berorientasi pada pelestarian hutan dan mengurangi 
        konsumsi produk yang berasal dari eksploitasi berlebihan.
    </font></p>

    <p><fontcolor="black">
        Setiap individu dapat berkontribusi dengan cara sederhana, seperti 
        menanam pohon, mengurangi penggunaan plastik, dan mendukung organisasi 
        lingkungan. Untuk informasi lebih lanjut mengenai pelestarian hutan, 
        kunjungi <a href="https://www.worldwildlife.org/" target="_blank">World Wildlife Fund</a>.
    </font></p>

    <hr>

<body>
</html>`,
    validate: (doc, html) => {
      const issues = [];
      
      // 1. Kesalahan: Tag <title> tidak ditutup dengan benar
      if (html.includes('<title>MISI TERAKHIR<title>') && !html.includes('</title>')) {
        issues.push('Perbaiki penutup tag title di bagian head');
      }
      
      // 2. Kesalahan: Atribut bgcolor tanpa tanda kutip
      if (html.includes('bgcolor=#e6ffe6') && !html.includes('bgcolor="#e6ffe6"') && !html.includes("bgcolor='#e6ffe6'")) {
        issues.push('Nilai atribut bgcolor harus dalam tanda kutip');
      }
      
      // 3. Kesalahan: Tag <fontcolor> seharusnya <font color>
      if (html.includes('<fontcolor="black">')) {
        issues.push('Perbaiki penulisan tag font dengan atribut color');
      }
      
      // 4. Kesalahan: Tag <body> kedua yang tidak perlu
      const bodyTags = (html.match(/<body/g) || []).length;
      if (bodyTags > 1) {
        issues.push('Hapus tag body kedua yang tidak diperlukan');
      }
      
      // 5. Kesalahan: Tag <font> dan <body> tidak ditutup dengan benar
      const fontTags = (html.match(/<font/g) || []).length;
      const closeFontTags = (html.match(/<\/font>/g) || []).length;
      const closeBodyTags = (html.match(/<\/body>/g) || []).length;
      
      if (fontTags !== closeFontTags) {
        issues.push('Pastikan semua tag font ditutup dengan benar');
      }
      if (bodyTags !== closeBodyTags) {
        issues.push('Pastikan tag body ditutup dengan benar');
      }
      
      return issues;
    }
  }
];

// --- Inisialisasi elemen DOM ---
const editor = document.getElementById('editor');
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');
const finishBtn = document.getElementById('finishBtn');
const startBtn = document.getElementById('startBtn');
const preview = document.getElementById('preview');
const log = document.getElementById('log');
const scoreInfo = document.getElementById('scoreInfo');
const activeTitle = document.getElementById('activeTitle');
const timerElement = document.getElementById('timer');
const startModal = document.getElementById('startModal');
const timeoutModal = document.getElementById('timeoutModal');
const reportModal = document.getElementById('reportModal');
const challengeList = document.getElementById('challengeList');
const identStatus = document.getElementById('identStatus');

// --- State aplikasi ---
let activeId = null;
const ident = { nama: '', kelas: '' };
const completed = new Set();

// Timer variables
let timerInterval = null;
let timeLeft = 150 * 60; // 150 minutes in seconds
let testStarted = false;
let testFinished = false;

// --- Fungsi untuk mengecek apakah misi 10 bisa diakses ---
function canAccessMission10() {
  // Hitung berapa banyak misi 1-9 yang sudah selesai
  const completedMissions1to9 = challenges
    .filter(ch => ch.id !== 'c10') // Exclude misi 10
    .filter(ch => completed.has(ch.id)).length;
  
  return completedMissions1to9 >= 9; // Harus semua misi 1-9 selesai
}

// --- Fungsi Timer ---
function startTimer() {
  testStarted = true;
  timerElement.classList.add('running');
  timerElement.classList.remove('stopped');
  
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.classList.remove('running');
      timerElement.classList.add('stopped');
      timeoutModal.style.display = 'flex';
      disableTest();
    }
    
    if (completed.size === challenges.length && !testFinished) {
      clearInterval(timerInterval);
      timerElement.classList.remove('running');
      timerElement.classList.add('finished');
      testFinished = true;
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `Waktu: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function disableTest() {
  editor.disabled = true;
  runBtn.disabled = true;
  resetBtn.disabled = true;
  startBtn.disabled = true;
}

function enableTest() {
  editor.disabled = false;
  runBtn.disabled = false;
  resetBtn.disabled = false;
}

// --- Render daftar tantangan ---
function renderChallenges() {
  challengeList.innerHTML = '';
  challenges.forEach(ch => {
    const div = document.createElement('div');
    
    // Cek apakah ini misi 10 dan apakah bisa diakses
    const isMission10 = ch.id === 'c10';
    const isLocked = isMission10 && !canAccessMission10();
    
    div.className = 'challenge' + 
      (activeId === ch.id ? ' active' : '') +
      (isLocked ? ' locked' : '');
    
    div.innerHTML = `
      <div class="title">${ch.title}${isLocked ? ' 🔒' : ''}</div>
      <div class="meta">${ch.description} • Tingkat: ${ch.difficulty}</div>
      <div class="status" id="st-${ch.id}">
        <span class="dot ${completed.has(ch.id) ? 'good' : (isLocked ? 'locked' : 'bad')}"></span>
        <span>${isLocked ? 'Terkunci' : (completed.has(ch.id) ? 'Lolos' : 'Belum lolos')}</span>
      </div>
      ${isLocked ? '<div class="lock-message">Selesaikan semua misi 1-9 untuk membuka</div>' : ''}
    `;
    
    div.addEventListener('click', () => {
      if (!testStarted) return;
      if (isLocked) {
        appendLog('Misi 10 terkunci! Selesaikan semua misi 1-9 terlebih dahulu.', 'warn');
        return;
      }
      activeId = ch.id;
      editor.value = ch.buggy;
      activeTitle.textContent = `Aktif: ${ch.title}`;
      renderChallenges();
      clearOutput();
    });
    
    challengeList.appendChild(div);
  });
  updateScore();
}

function clearOutput() {
  log.textContent = 'Log akan muncul di sini setelah menjalankan kode...';
  const doc = preview.contentDocument;
  if (doc) {
    doc.open(); 
    doc.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Preview</title></head><body style="font-family: sans-serif; color:#111; padding: 20px;">Preview akan tampil di sini setelah klik "Jalankan"</body></html>'); 
    doc.close();
  }
}

function updateScore() {
  scoreInfo.textContent = `Selesai: ${completed.size}/${challenges.length}`;
  finishBtn.disabled = completed.size !== challenges.length || !ident.nama || !ident.kelas;
  startBtn.disabled = !(ident.nama.trim().length >= 3 && ident.kelas.trim().length >= 2);
}

function setIdentStatus() {
  const ok = ident.nama.trim().length >= 3 && ident.kelas.trim().length >= 2;
  identStatus.textContent = ok ? 'Lengkap' : 'Belum lengkap';
  const dot = identStatus.previousElementSibling;
  dot.className = 'dot ' + (ok ? 'good' : 'warn');
  updateScore();
}

// --- Fungsi Log dengan styling baru ---
function appendLog(text, type = 'info') {
  const line = document.createElement('div');
  line.className = `log ${type}`;
  
  // Tambahkan icon berdasarkan type
  if (type === 'good') {
    line.innerHTML = `✓ ${text}`;
  } else if (type === 'warn') {
    line.innerHTML = `⚠ ${text}`;
  } else if (type === 'bad') {
    line.innerHTML = `✗ ${text}`;
  } else {
    line.textContent = text;
  }
  
  log.appendChild(line);
  
  // Auto scroll ke bottom
  log.scrollTop = log.scrollHeight;
  
  return line;
}

// --- Validasi kode ---
function runValidation() {
  if(!activeId) {
    appendLog('Pilih tantangan dulu di panel kiri', 'warn');
    return;
  }
  
  // Cek khusus untuk misi 10
  if (activeId === 'c10' && !canAccessMission10()) {
    appendLog('Misi 10 terkunci! Selesaikan semua misi 1-9 terlebih dahulu.', 'warn');
    return;
  }
  
  const html = editor.value;
  const previewDoc = preview.contentDocument;
  
  // Render ke iframe
  previewDoc.open();
  previewDoc.write(html);
  previewDoc.close();

  // Tunggu sejenak agar DOM siap
  setTimeout(() => {
    const ch = challenges.find(c => c.id === activeId);
    const issues = ch.validate(previewDoc, html);

    // Tampilkan hasil
    log.textContent = '';
    
    if(issues.length === 0) {
      const successLog = appendLog('Semua syarat validasi terpenuhi. Tantangan Lolos', 'good');
      appendLog('🎉 SELAMAT! Anda berhasil menyelesaikan tantangan ini!', 'good');
      
      completed.add(ch.id);
      document.getElementById('st-'+ch.id).innerHTML = '<span class="dot good"></span><span>Lolos</span>';
      
      // Jika misi 10 berhasil diselesaikan, render ulang untuk update UI
      if (ch.id === 'c10') {
        renderChallenges();
      }
      
      if (completed.size === challenges.length && !testFinished) {
        clearInterval(timerInterval);
        timerElement.classList.remove('running');
        timerElement.classList.add('finished');
        testFinished = true;
        appendLog('🏆 LUAR BIASA! Semua tantangan telah diselesaikan!', 'good');
        appendLog('Klik "Lihat Raport" untuk melihat hasil akhir.', 'good');
        showReport();
      }
    } else {
      appendLog('Validasi belum lolos. Perbaiki poin berikut:', 'warn');
      issues.forEach(i => appendLog('• ' + i, 'warn'));
      completed.delete(ch.id);
      document.getElementById('st-'+ch.id).innerHTML = '<span class="dot bad"></span><span>Belum lolos</span>';
    }
    updateScore();
  }, 100);
}

function showReport() {
  const date = new Date();
  const reportContent = document.getElementById('reportContent');
  
  let challengesHTML = '';
  challenges.forEach((ch, index) => {
    const status = completed.has(ch.id) ? 'completed' : 'pending';
    const statusText = completed.has(ch.id) ? 'Lolos' : 'Belum Lolos';
    
    challengesHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${ch.title}</td>
        <td>${ch.difficulty}</td>
        <td class="${status}">${statusText}</td>
      </tr>
    `;
  });
  
  const timeUsed = 150 - Math.floor(timeLeft / 60);
  
  reportContent.innerHTML = `
    <h1>RAPORT TES HTML DASAR</h1>
    <div class="subtitle">SMAN 2 Padalarang - Kelas XI</div>
    
    <div class="info">
      <div><strong>Nama:</strong> ${ident.nama}</div>
      <div><strong>Kelas:</strong> ${ident.kelas}</div>
    </div>
    
    <div class="info">
      <div><strong>Tanggal:</strong> ${date.toLocaleDateString('id-ID')}</div>
      <div><strong>Waktu Digunakan:</strong> ${timeUsed} menit</div>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tantangan</th>
          <th>Tingkat Kesulitan</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${challengesHTML}
      </tbody>
    </table>
    
    <div style="margin-top: 20px; font-size: 18px;">
      <strong>Nilai: ${Math.round((completed.size / challenges.length) * 100)}</strong>
    </div>
    
    <div style="margin-top: 10px; font-size: 14px; color: #4a5568;">
      Silakan foto layar ini sebagai bukti telah menyelesaikan tes
    </div>
  `;
  
  reportModal.style.display = 'flex';
}

// --- Event Listeners ---
document.getElementById('nama').addEventListener('input', (e) => {
  ident.nama = e.target.value; 
  setIdentStatus();
});

document.getElementById('kelas').addEventListener('input', (e) => {
  ident.kelas = e.target.value; 
  setIdentStatus();
});

runBtn.addEventListener('click', runValidation);

resetBtn.addEventListener('click', () => {
  if(!activeId) return;
  const ch = challenges.find(c => c.id === activeId);
  editor.value = ch.buggy;
  clearOutput();
});

finishBtn.addEventListener('click', showReport);

startBtn.addEventListener('click', () => {
  startModal.style.display = 'flex';
});

document.getElementById('cancelStart').addEventListener('click', () => {
  startModal.style.display = 'none';
});

document.getElementById('confirmStart').addEventListener('click', () => {
  startModal.style.display = 'none';
  startTimer();
  enableTest();
  
  if (challenges.length > 0) {
    activeId = challenges[0].id;
    editor.value = challenges[0].buggy;
    activeTitle.textContent = `Aktif: ${challenges[0].title}`;
    renderChallenges();
    clearOutput();
  }
});

document.getElementById('viewResults').addEventListener('click', () => {
  timeoutModal.style.display = 'none';
  showReport();
});

document.getElementById('closeReport').addEventListener('click', () => {
  reportModal.style.display = 'none';
});

// --- Inisialisasi aplikasi ---
function initApp() {
  clearOutput();
  renderChallenges();
  setIdentStatus();
  updateTimerDisplay();
}

// Jalankan inisialisasi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);

