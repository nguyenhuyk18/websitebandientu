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

// Set thumpnail image
function thumpnailClick(src) {
    const imagePrimary = document.querySelector('.image-primary');
    imagePrimary.setAttribute('src', src);

    imagePrimary.classList.remove('animate__animated');
    imagePrimary.classList.remove('animate__fadeInLeft');

    imagePrimary.classList.add('animate__animated');
    imagePrimary.classList.add('animate__fadeInLeft');
}

function updateURL(key, val) {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set(key, val);
    return currentURL.toString();
}
$('.message').hide();

$(".create-comment").validate({
    rules: {
        fullname: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i
        },
        email: {
            required: true,
            email: true
        },
        description: {
            required: true,

        },

    },

    messages: {
        fullname: {
            required: 'Vui lòng nhập họ tên',
            maxlength: 'Vui lòng nhập email',
            regex: 'Vui lòng không nhập số hoặc ký tự đặc biệt'
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'vui lòng nhập đúng định dạng email. vd: avx@gmail.com'
        },
        description: {
            required: 'Vui lòng nhập nội dung',
        },

    },

    // jquery validation hỗ trợ cái anyf
    submitHandler: function (form) {
        // alert(typeof $(form).serialize())
        $('.message').show();
        $('.message').html('<i class="fas fa-spinner fa-spin"></i> Hệ thống đang lưu gửi bình luận, vui lòng chờ ...');
        $.ajax({
            type: "POST",
            url: "/san-pham/store-comment",
            data: $(form).serialize(),
            success: function (response) {
                // alert(response);
                $('.review-item').html(response);
                $('.create-comment')[0].reset();
                $('.message').hide();
            }
        });
    },


});




$('.messagecontact').hide();
$(".contact-form").validate({
    rules: {
        fullname: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            regex: /^0([0-9]{9,9})$/
        },
        message: {
            required: true,
        },

    },

    messages: {
        fullname: {
            required: 'Vui lòng nhập họ tên',
            maxlength: 'Vui lòng nhập email',
            regex: 'Vui lòng không nhập số hoặc ký tự đặc biệt'
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'vui lòng nhập đúng định dạng email. vd: avx@gmail.com'
        },
        phone: {
            required: 'Vui lòng nhập số điện thoại',
            regex: 'Vui lòng nhập đúng định dạng số điện thoại. vd: 0385548843'
        },
        message: {
            required: 'Vui lòng nhập nội dung',
        },

    },

    // jquery validation hỗ trợ cái anyf
    submitHandler: function (form) {
        // alert()
        $('.messagecontact').show();
        $('.messagecontact').html('<i class="fas fa-spinner fa-spin"></i> Hệ thống đang gửi mail, vui lòng chờ ...');
        $.ajax({
            type: "POST",
            url: "/lien-he/gui-email",
            data: $(form).serialize(),


            success: function (response) {
                // alert(response)
                $('.messagecontact').html(response);
            }
        });
    },


});


$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);

// pagination
function goToPage(i) {
    const newURL = updateURL('page', i);
    window.location.href = newURL;
}

