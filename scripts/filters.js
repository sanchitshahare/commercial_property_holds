function filterProps(type, button) {
  document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));

  if (button) {
    button.classList.add('active');
  }

  document.querySelectorAll('.property-card').forEach((card) => {
    if (type === 'all' || card.dataset.type === type) {
      card.style.display = '';
      card.style.animation = 'fadeSlideUp 0.4s ease both';
      return;
    }

    card.style.display = 'none';
  });
}

function initPropertyFilters() {
  window.filterProps = filterProps;
}
