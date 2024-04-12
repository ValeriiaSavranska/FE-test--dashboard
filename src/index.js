// MOBILE MENU //

const body = document.querySelector('body');
const mobBtn = document.querySelector('.mob-btn');
const aside = document.querySelector('.aside');

let isAsideShow = false;
const mobBtnHandelClick = () => {
  const svgBtn = document.querySelector('.mob-btn use');
  console.log(svgBtn);
  isAsideShow = !isAsideShow;
  aside.classList.toggle('aside--hidden');
  if (isAsideShow) {
    body.classList.add('noScroll');
    svgBtn.setAttribute('href', './src/images/symbol-defs.svg#icon-cross');
    mobBtn.style.left = '270px';
  } else {
    body.classList.remove('noScroll');
    svgBtn.setAttribute('href', './src/images/symbol-defs.svg#icon-menu');
    mobBtn.style.left = '5px';
  }
};

mobBtn.addEventListener('click', mobBtnHandelClick);

// TABLE FILLING + PAGINATION //

const pagination = document.querySelector('.pagination');
const tableBody = document.querySelector('.table__body');

let page = 0;
const per_page = 8;
const pageNumbers = [];

const getData = async () => {
  const response = await fetch('./../src/info.json');
  const data = await response.json();

  return data;
};

const paginate = event => {
  if (event.target.classList.contains('pagination__item--dots')) {
    return;
  }

  if (event.target.classList.contains('pagination__item--arrow-left')) {
    if (page < 1) return;
    page -= 1;
    console.log('arrow-left', page);
  } else if (event.target.classList.contains('pagination__item--arrow-right')) {
    if (page >= pageNumbers.length - 1) return;
    page += 1;
  } else {
    page = Number(event.target.textContent) - 1;
    console.log('page', page);
  }

  if (pageNumbers.length - 1 > 6) {
    if (page < 3) {
      const paginationMarkup = pageNumbers
        .map((number, index) => {
          if (pageNumbers.length - 1 > 6 && index === 4) {
            return `<li class="pagination__item pagination__item--dots">...</li><li class="pagination__item">${pageNumbers.length}</li>`;
          } else if (pageNumbers.length - 1 > 6 && index > 4) {
            return;
          }
          return `<li class="pagination__item ${
            index === 0 ? 'pagination__item--active' : ''
          }">${number}</li>`;
        })
        .join(' ');

      pagination.innerHTML =
        `<li class="pagination__item pagination__item--arrow-left">&#60;</li>` +
        paginationMarkup +
        `<li class="pagination__item pagination__item--arrow-right">&#62;</li>`;

      const paginationItems = document.querySelectorAll('.pagination__item');
      for (item of paginationItems) {
        item.addEventListener('click', paginate);
      }
    } else if (page >= 3 && page === pageNumbers.length - 4) {
      const paginationMarkup = `<li class="pagination__item">1</li>
                                <li class="pagination__item pagination__item--dots">...</li>
                                <li class="pagination__item">${page + 1}</li>
                                <li class="pagination__item">${page + 2}</li>
                                <li class="pagination__item">${page + 3}</li>
                                <li class="pagination__item">${pageNumbers.length}</li>`;

      pagination.innerHTML =
        `<li class="pagination__item pagination__item--arrow-left">&#60;</li>` +
        paginationMarkup +
        `<li class="pagination__item pagination__item--arrow-right">&#62;</li>`;

      const paginationItems = document.querySelectorAll('.pagination__item');
      for (item of paginationItems) {
        item.addEventListener('click', paginate);
      }
    } else if (page === pageNumbers.length - 1) {
      const paginationMarkup = `<li class="pagination__item">1</li>
                                <li class="pagination__item pagination__item--dots">...</li>
                                <li class="pagination__item">${pageNumbers.length - 3}</li>
                                <li class="pagination__item">${pageNumbers.length - 2}</li>
                                <li class="pagination__item">${pageNumbers.length - 1}</li>
                                <li class="pagination__item">${pageNumbers.length}</li>`;

      pagination.innerHTML =
        `<li class="pagination__item pagination__item--arrow-left">&#60;</li>` +
        paginationMarkup +
        `<li class="pagination__item pagination__item--arrow-right">&#62;</li>`;

      const paginationItems = document.querySelectorAll('.pagination__item');
      for (item of paginationItems) {
        item.addEventListener('click', paginate);
      }
    } else if (page >= 3 && page < pageNumbers.length - 4) {
      const paginationMarkup = `<li class="pagination__item">1</li><li class="pagination__item pagination__item--dots">...</li><li class="pagination__item pagination__item--active">${
        page + 1
      }</li><li class="pagination__item">${
        page + 2
      }</li><li class="pagination__item pagination__item--dots">...</li><li class="pagination__item">${
        pageNumbers.length
      }</li>`;

      pagination.innerHTML =
        `<li class="pagination__item pagination__item--arrow-left">&#60;</li>` +
        paginationMarkup +
        `<li class="pagination__item pagination__item--arrow-right">&#62;</li>`;

      const paginationItems = document.querySelectorAll('.pagination__item');
      for (item of paginationItems) {
        item.addEventListener('click', paginate);
      }
    }
  }

  const paginationItems = document.querySelectorAll('.pagination__item');
  for (item of paginationItems) {
    console.log(item.textContent === String(page + 1));
    if (item.textContent !== event.target.textContent) {
      item.classList.remove('pagination__item--active');
    }

    if (item.textContent === String(page + 1)) {
      item.classList.add('pagination__item--active');
    }
  }

  getData().then(data => {
    const info = data.slice(page * per_page, page * per_page + per_page);

    const markup = info
      .map(
        item => `<tr class="table__row table__row--body">
                  <td class="table__data table__data--body" data-label="Customer Name">
                    ${item.name}
                  </td>
                  <td class="table__data table__data--body" data-label="Company">${
                    item.company
                  }</td>
                  <td class="table__data table__data--body" data-label="Phone Number">
                    ${item.phone}
                  </td>
                  <td class="table__data table__data--body" data-label="Email">
                    ${item.email}
                  </td>
                  <td class="table__data table__data--body" data-label="Country">${
                    item.country
                  }</td>
                  <td
                    class="table__data table__data--body table__status table__status--${item.status.toLowerCase()}"
                    data-label="Status"
                  >
                    ${item.status}
                  </td>
                </tr>`,
      )
      .join(' ');

    tableBody.innerHTML = markup;
  });
};

getData().then(data => {
  const info = data.slice(page * per_page, page * per_page + per_page);

  for (var i = 1; i <= data.length / per_page; i++) {
    pageNumbers.push(i);
  }

  const paginationMarkup = pageNumbers
    .map((number, index) => {
      if (pageNumbers.length - 1 > 6 && index === 4) {
        return `<li class="pagination__item pagination__item--dots">...</li><li class="pagination__item">${pageNumbers.length}</li>`;
      } else if (pageNumbers.length - 1 > 6 && index > 4) {
        return;
      }
      return `<li class="pagination__item ${
        index === 0 ? 'pagination__item--active' : ''
      }">${number}</li>`;
    })
    .join(' ');

  pagination.innerHTML =
    `<li class="pagination__item pagination__item--arrow-left">&#60;</li>` +
    paginationMarkup +
    `<li class="pagination__item pagination__item--arrow-right">&#62;</li>`;

  const paginationItems = document.querySelectorAll('.pagination__item');
  for (item of paginationItems) {
    item.addEventListener('click', paginate);
  }

  const markup = info
    .map(
      item => `<tr class="table__row table__row--body">
                  <td class="table__data table__data--body" data-label="Customer Name">
                    ${item.name}
                  </td>
                  <td class="table__data table__data--body" data-label="Company">${
                    item.company
                  }</td>
                  <td class="table__data table__data--body" data-label="Phone Number">
                    ${item.phone}
                  </td>
                  <td class="table__data table__data--body" data-label="Email">
                    ${item.email}
                  </td>
                  <td class="table__data table__data--body" data-label="Country">${
                    item.country
                  }</td>
                  <td
                    class="table__data table__data--body table__status table__status--${item.status.toLowerCase()}"
                    data-label="Status"
                  >
                    ${item.status}
                  </td>
                </tr>`,
    )
    .join(' ');

  tableBody.innerHTML = markup;
});
