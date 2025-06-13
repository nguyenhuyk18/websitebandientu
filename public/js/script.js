// Chi tiết sản phẩm thumpnelimage
function scrollThumbs(direction) {
    const el = document.getElementById('thumbs-scroll');
    el.scrollBy({ left: direction * 80, behavior: 'smooth' });
}


// Slider sản phẩm liên quan
function scrollRelated(direction) {
    const el = document.getElementById('related-scroll');
    el.scrollBy({ left: direction * 180, behavior: 'smooth' });
}

// Đánh giá sao động
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('#star-rating .star-select');
    const ratingInput = document.getElementById('rating-value');
    let currentRating = parseInt(ratingInput.value) || 0;

    function setStars(rating) {
        stars.forEach((star, idx) => {
            if (idx < rating) {
                star.classList.remove('text-secondary');
            } else {
                star.classList.add('text-secondary');
            }
        });
    }

    setStars(currentRating);

    stars.forEach((star, idx) => {
        star.addEventListener('mouseenter', () => setStars(idx + 1));
        star.addEventListener('mouseleave', () => setStars(currentRating));
        star.addEventListener('click', () => {
            currentRating = idx + 1;
            ratingInput.value = currentRating;
            setStars(currentRating);
        });
    });
});

// check out
document.addEventListener('DOMContentLoaded', function () {
    const cod = document.getElementById('cod');
    const bank = document.getElementById('bank');
    const bankInfo = document.querySelector('.bank-info');
    if (cod && bank && bankInfo) {
        cod.addEventListener('change', () => { if (cod.checked) bankInfo.style.display = 'none'; });
        bank.addEventListener('change', () => { if (bank.checked) bankInfo.style.display = 'block'; });
    }
});


// tapbin


clickTapPills = (data_open) => {
    const buttonTabPin = document.querySelectorAll('.nav-tap .nav-item button')
    const tapProduct = document.querySelectorAll('.tab-content .product-by-brand');
    tapProduct.forEach(row => {
        row.classList.remove('show');
        row.classList.remove('hide');
    })


    // console.log(document.querySelector(this))
    buttonTabPin.forEach(row => {
        // console.log()
        if (row.getAttribute('data_open') == data_open) {
            row.classList.add('active')
        }
        else {
            row.classList.remove('active')
        }
    })


    tapProduct.forEach(row => {
        if (row.id == data_open) {
            row.classList.add('show');
        }
        else {
            row.classList.add('hide');
        }
    })
}





