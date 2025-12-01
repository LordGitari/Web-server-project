// quick actions functionality
var favoriteBtn = document.querySelector('.quick-actions .btn:nth-child(3) button');
var shareBtn = document.querySelector('.quick-actions .btn:nth-child(4) button');

// favorites functionality
if(favoriteBtn) {
  favoriteBtn.addEventListener('click', function() {
    var icon = this.querySelector('i');
    if(icon.classList.contains('bi-heart')) {
      icon.classList.remove('bi-heart');
      icon.classList.add('bi-heart-fill');
      this.classList.add('btn-gradient');
      this.classList.remove('btn-outline-gradient');
      alert('Added to favorites!');
    } else {
      icon.classList.remove('bi-heart-fill');
      icon.classList.add('bi-heart');
      this.classList.remove('btn-gradient');
      this.classList.add('btn-outline-gradient');
      alert('Removed from favorites!');
    }
  });
}

// share functionality
if(shareBtn) {
  shareBtn.addEventListener('click', function() {
    if(navigator.share) {
      navigator.share({
        title: '2024 Luxury Sports Coupe',
        text: 'Check out this amazing car!',
        url: window.location.href
      });
    } else {
      // fallback for browsers without native share
      var url = window.location.href;
      navigator.clipboard.writeText(url).then(function() {
        alert('Link copied to clipboard!');
      });
    }
  });
}