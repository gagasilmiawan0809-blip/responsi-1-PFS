// Data store (kosong awal)
const students = [];

// DOM references
const addForm = document.getElementById('addForm');
const studentTableBody = document.getElementById('studentTableBody');
const countBadge = document.getElementById('countBadge');

// Bootstrap modal instances
let editModalInstance = null;
let deleteModalInstance = null;

// Render table
function renderTable(){
  studentTableBody.innerHTML = '';
  students.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.nim)}</td>
      <td>${escapeHtml(s.major)}</td>
      <td>${escapeHtml(s.email || '')}</td>
      <td>
        <button class="btn-edit btn btn-sm btn-outline-primary me-1" data-index="${i}">Edit</button>
        <button class="btn-delete btn btn-sm btn-outline-danger" data-index="${i}">Hapus</button>
      </td>
    `;
    studentTableBody.appendChild(tr);
  });
  countBadge.textContent = students.length;

  // small visual cue
  const tableCard = document.getElementById('tableCard');
  if(tableCard){
    tableCard.classList.add('pulse');
    setTimeout(()=> tableCard.classList.remove('pulse'), 700);
  }
}

// Escape HTML
function escapeHtml(text){
  return String(text).replace(/&/g, '&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Validate NIM (hanya angka)
function isValidNIM(nim){
  return /^\d+$/.test(nim);
}

// Add new student
addForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const nim = document.getElementById('nim').value.trim();
  const major = document.getElementById('major').value.trim();
  const email = document.getElementById('email').value.trim();

  if(!name || !nim || !major){
    alert('Nama, NIM, dan Jurusan wajib diisi.');
    return;
  }

  if(!isValidNIM(nim)){
    alert('NIM hanya boleh diisi angka.');
    return;
  }

  students.push({ name, nim, major, email });
  renderTable();
  addForm.reset();
});

// Event delegation for Edit/Delete buttons
studentTableBody.addEventListener('click', function(e){
  const btn = e.target.closest('button');
  if(!btn) return;
  const index = Number(btn.getAttribute('data-index'));
  if(btn.classList.contains('btn-edit')){
    openEditModal(index);
  } else if(btn.classList.contains('btn-delete')){
    openDeleteModal(index);
  }
});

// Open Edit Modal
function openEditModal(index){
  const s = students[index];
  document.getElementById('editIndex').value = index;
  document.getElementById('editName').value = s.name;
  document.getElementById('editNim').value = s.nim;
  document.getElementById('editMajor').value = s.major;
  document.getElementById('editEmail').value = s.email || '';

  const modalEl = document.getElementById('editModal');
  editModalInstance = new bootstrap.Modal(modalEl);
  editModalInstance.show();
}

// Save edit
document.getElementById('saveEditBtn').addEventListener('click', function(){
  const index = Number(document.getElementById('editIndex').value);
  const name = document.getElementById('editName').value.trim();
  const nim = document.getElementById('editNim').value.trim();
  const major = document.getElementById('editMajor').value.trim();
  const email = document.getElementById('editEmail').value.trim();

  if(!name || !nim || !major){
    alert('Nama, NIM, dan Jurusan wajib diisi.');
    return;
  }

  if(!isValidNIM(nim)){
    alert('NIM hanya boleh diisi angka.');
    return;
  }

  students[index] = { name, nim, major, email };
  renderTable();
  if(editModalInstance) editModalInstance.hide();
});

// Open delete modal
function openDeleteModal(index){
  document.getElementById('deleteIndex').value = index;
  const modalEl = document.getElementById('deleteModal');
  deleteModalInstance = new bootstrap.Modal(modalEl);
  deleteModalInstance.show();
}

// Confirm delete
document.getElementById('confirmDeleteBtn').addEventListener('click', function(){
  const index = Number(document.getElementById('deleteIndex').value);
  if(Number.isInteger(index) && index >= 0 && index < students.length){
    students.splice(index, 1);
    renderTable();
  }
  if(deleteModalInstance) deleteModalInstance.hide();
});

// jQuery sidebar toggle
$(function(){
  $('#sidebarToggle').on('click', function(){
    $('#sidebar').toggleClass('collapsed');
    $('#sidebar').toggleClass('show-mobile');
  });

  $('#sidebar .nav-link').on('click', function(){
    if(window.innerWidth < 768){
      $('#sidebar').removeClass('show-mobile');
    }
    $(this).addClass('active');
    const self = this;
    setTimeout(()=> $(self).removeClass('active'), 900);
  });
});

// Initial render
renderTable();
