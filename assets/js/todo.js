const description = document.getElementById('description');
const due_date = document.getElementById('due_date');
const today = new Date();
due_date.setAttribute(
  'min',
  `${today.getFullYear()}-${
    today.getMonth() + 1 > 9
      ? today.getMonth() + 1
      : '0' + (today.getMonth() + 1)
  }-${today.getUTCDate()}`
);
const category = document.getElementById('category');
const add = document.getElementById('add');
const del = document.getElementById('delete');
const task_lists = document.querySelector('.task-lists');
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const taskList = (desc, date, ctg) => {
  return `
  <div class="task-list">
  <div class="checkbox">
    <input
      type="checkbox"
      class="input_checkbox"
      id="task_action"
      name="task_action"
    />
  </div>
  <div class="task_desc">
    <p class="desc">${desc}</p>
    <p><i class="fas fa-calendar-alt icon"></i>${date}</p>
  </div>
  <div class="task_ctg">
    <p class="tag ${ctg}">${ctg}</p>
  </div>
</div>
  `;
};

// on click of add task button
add.addEventListener('click', () => {
  const desc = description.value;
  let date = due_date.value;
  const ctg = category.value;

  // if any of the field is empty then show alert to pass the info.
  if (desc === '') {
    alert("Description can't be empty!");
    return;
  }
  if (date === '') {
    alert('please select a date');
    return;
  }
  if (ctg === '') {
    alert('Please select a category!');
    return;
  }

  // create date formatted like mm dd, yyyy
  const mnth = month[date.split('-')[1].split('')[1]];
  const day = date.split('-')[2];
  const year = date.split('-')[0];

  // create request
  const request = {
    description: desc,
    dueDate: `${mnth} ${day}, ${year}`,
    category: ctg,
  };

  // post request for adding the task
  fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(request),
  })
    .then((response) => {
      if (response.status == 200) {
        description.value = '';
        due_date.value = '';
        ctg.value = '';
        alert('Item added successfully!');
        window.location.reload();
      }
    })
    .catch((err) => {
      if (err.status == 500) {
        console.log(err.body);
      }
    });
});

del.addEventListener('click', function () {
  const newNodes = [];
  task_lists.childNodes.forEach((item) => {
    const id = item.id;
    if (id && item.querySelector('.input_checkbox').checked) {
      newNodes.push({ id });
    }
  });
  if (newNodes.length > 0) {
    // task_lists.innerHTML = '';
    fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNodes),
    })
      .then((response) => {
        if (response.status == 200) {
          alert('Items deleted successfully!');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
