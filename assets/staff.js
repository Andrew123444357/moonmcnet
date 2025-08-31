async function loadStaff(){
  try{
    const res = await fetch('assets/staff.json', {cache:'no-store'});
    const staff = await res.json();
    const grid = document.getElementById('staffGrid');
    const empty = document.getElementById('emptyMsg');

    if(!Array.isArray(staff) || staff.length === 0){
      empty.classList.remove('hidden');
      return;
    }

    staff.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.className = 'avatar';
      const url = p.avatar || (p.mcName ? `https://minotar.net/avatar/${encodeURIComponent(p.mcName)}/100` : '');
      img.src = url;
      img.alt = p.name || 'avatar';

      const info = document.createElement('div');
      info.className = 'person';

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = p.name || 'Unnamed';

      const role = document.createElement('span');
      role.className = 'role ' + (p.roleClass || 'staff');
      role.textContent = p.role || 'Staff';

      info.appendChild(name);
      info.appendChild(role);

      card.appendChild(img);
      card.appendChild(info);
      grid.appendChild(card);
    });
  }catch(e){
    console.error(e);
    document.getElementById('emptyMsg').textContent = 'Could not load staff.json';
    document.getElementById('emptyMsg').classList.remove('hidden');
  }
}
loadStaff();
