const toastsuccess = document.getElementsByClassName('toast-success');
const toasterror = document.getElementsByClassName('toast-danger');

if (toastsuccess.length) {
    // Bật hiệu ứng hiện
    const tmp = toastsuccess[0]
    setTimeout(() => tmp.classList.add('show'), 100);

    // Tự động ẩn sau 5s
    setTimeout(() => {
        tmp.classList.remove('show');
        tmp.classList.add('hide');
    }, 5000);
}


if (toasterror.length) {
    // Bật hiệu ứng hiện
    const tmp = toasterror[0]
    setTimeout(() => tmp.classList.add('show'), 100);

    // Tự động ẩn sau 5s
    setTimeout(() => {
        tmp.classList.remove('show');
        tmp.classList.add('hide');
    }, 5000);
}

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
    if (!ratingInput) return;
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

// Lưu trữ comment
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

// liên lạc
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




// pagination phân trang
function goToPage(i) {
    const newURL = updateURL('page', i);
    window.location.href = newURL;
}



// phân loại theo giá
const pricerange = document.querySelectorAll('.price-range');
for (const tmp of pricerange) {
    tmp.onclick = () => {
        // const currentPriceRange = tmp.;
        const value = tmp.value;
        // console.log(value);
        window.location.href = updateURL('price-range', value);
    }
}


// sắp xếp sản phẩm theo các tiêu chí 
const sortigation = document.querySelector('.sortigation');
if (sortigation) {
    sortigation.onchange = () => {
        // alert(sortigation.value);
        window.location.href = updateURL('sort', sortigation.value);
    }
}


// =================== CART =========================================//



updateCartModal = () => {
    const data = getCookie('cart');
    if (typeof data == 'undefined' || !data) return;
    const dataJson = JSON.parse(data);
    const products = dataJson.product;
    let html = ``;
    for (const product of products) {
        // console.log(product)
        const tmp1 = Object.keys(product);
        const tmp = Object.values(product);
        const value = tmp[0];
        const key = tmp1[0];
        html += `<tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="/upload/product/${value.image}" alt="${value.image}" style="width:56px;height:56px;object-fit:contain;" class="rounded-3 border">
                    <span class="fw-semibold">${value.name}</span>
                  </div>
                </td>
                <td class="text-center text-nowrap">${formatVND(value.price)}</td>
                <td class="text-center">
                  <input type="number" min="1" onchange="updateQtyInCart(this)" product_id="${key}" value="${value.qty}" class="form-control text-center qtyinput rounded-pill" style="width:90px;" onkeydown="return false;">
                </td>
                <td class="text-center text-nowrap fw-semibold">${formatVND(value.total)}</td>
                <td class="text-center">
                  <button  onclick="deleteProductFromCart('${key}')" class="btn btn-link text-danger p-0" title="Xóa" >
                    <i class="fa fa-trash-alt fa-lg"></i>
                  </button>
                </td>
              </tr>`;

    }
    const cartcount = document.querySelector('.cart-box .cart-count');
    cartcount.innerHTML = dataJson.total_product;

    const totalcart = document.querySelector('#cartonmenu .total_cart')
    totalcart.innerHTML = formatVND(dataJson.total_price);

    const tbodyCart = document.querySelector('.table-cart tbody');
    tbodyCart.innerHTML = html;
}

updateCartModal();

deleteProductFromCart = (id) => {
    $.ajax({
        type: "GET",
        url: `/xoa-san-pham-tu-gio-hang-${id}.html`,
        // data: "data",
        // dataType: "dataType",
        success: function () {
            updateCartModal();
        }
    });
}


updateQtyInCart = (input) => {
    // const tmp = document.querySelector(this);

    console.log(input.value);
    const value = input.value;
    const id = input.getAttribute('product_id');

    $.ajax({
        type: "GET",
        url: `/cap-nhat-so-luong-trong-gio-hang.html?id=${id}&qty=${value}`,
        // data: "data",
        // dataType: "dataType",
        success: function () {
            updateCartModal();
        }
    });

}

// $.ajax({
//     type: "GET",
//     url: `/cap-nhat-so-luong-trong-gio-hang.html?id=${id}&qty=${value}`,
//     // data: "data",
//     // dataType: "dataType",
//     success: function () {
//         updateCartModal();
//     }
// });


// deleteProductFromCart();

// khi nguoi dung ms vao web neu coookie con ton tai thi lay du lieu ve
// updateCartModal();
// get cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// cookie 
function addcartindisplay(id) {
    $.ajax({
        type: "GET",
        url: `/them-gio-hang.html?id=${id}&quantity=${1}`,
        // data: "data",
        // dataType: "dataType",
        success: function () {
            // alert(response);
            updateCartModal();
        }
    });
}

function addcartindetail(id) {
    const inputqty = document.querySelector('.qtyindetail');
    const qty = inputqty.value;

    $.ajax({
        type: "GET",
        url: `/them-gio-hang.html?id=${id}&quantity=${qty}`,
        // data: "data",
        // dataType: "dataType",
        success: function () {
            // alert(response);
            updateCartModal();
        }
    });

}

function formatVND(amount) {
    amount = parseInt(amount); // Đảm bảo là số nguyên
    return amount.toLocaleString('vi-VN') + ' ₫';
}

// validate form đăng ký
$(".form-register").validate({
    rules: {
        name: {
            required: true,
            maxlength: 50,
        },
        username: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-Z0-9_]+$/i
        },
        phone: {
            required: true,
            regex: /^0([0-9]{9,9})$/
        },
        password: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            required: true,
        },
        email: {
            required: true,
            email: true
        },
        repassword: {
            required: true,
            equalTo: '#registerPassword'
        }
    },

    messages: {
        name: {
            required: 'Vui lòng nhập họ tên',
            maxlength: 'Vui lòng nhập họ tên không quá 50 ký tự',
            regex: 'Vui lòng không nhập số hoặc ký tự đặc biệt'
        },
        username: {
            required: 'Vui lòng nhập username',
            maxlength: 'Vui lòng nhập username không quá 50 ký tự',
            regex: 'Vui lòng không nhập ký tự đặc biệt'
        },
        password: {
            required: 'Vui lòng nhập mật khẩu',
            regex: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'vui lòng nhập đúng định dạng email. vd: avx@gmail.com'
        },
        repassword: {
            required: 'Vui lòng nhập lại mật khẩu',
            equalTo: 'Nhập lại mật khẩu không chính xác'
        },
        phone: {
            required: 'Vui lòng nhập số điện thoại',
            regex: 'Vui lòng nhập đúng định dạng số điện thoại. vd: 0385548843'
        }
    },
});

// validate form đăng nhập
$(".login-form").validate({
    rules: {


        username: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-Z0-9_]+$/i
        },

        password: {
            required: true,
        },

    },

    messages: {
        username: {
            required: 'Vui lòng nhập username',
            maxlength: 'Vui lòng nhập username không quá 50 ký tự',
            regex: 'Vui lòng không nhập ký tự đặc biệt'
        },

        password: {
            required: 'Vui lòng nhập mật khẩu',
        },
    },
});


// validate change password
$(".customer-changepass-form").validate({
    rules: {
        name: {
            required: true,
            maxlength: 50,
        },

        new_password: {
            // required: true,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        },

        confirm_password: {
            equalTo: "#new_password"
        }

    },

    messages: {
        name: {
            required: 'Vui lòng nhập họ tên',
            maxlength: 'Vui lòng nhập họ tên không quá 50 ký tự',
        },

        new_password: {
            regex: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
        },

        confirm_password: {
            equalTo: 'Nhập lại mật khẩu không chính xác'
        }
    },
});


// validate modal change password
$(".quenmk-form").validate({
    rules: {
        email: {
            required: true,
            email: true
        }
    },

    messages: {
        email: {
            required: 'Vui lòng nhập email',
            email: 'Vui lòng nhập đúng định dạng email. vd: avx@gmail.com'
        }
    }
});

// validate form đổi mật khẩu
$('.customer-changepass-form-mail').validate({
    rules: {
        new_password: {
            required: true,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        },
        confirm_password: {
            equalTo: "#new_password"
        }
    },

    messages: {
        new_password: {
            required: 'Vui lòng nhập mật khẩu mới',
            regex: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
        },
        confirm_password: {
            equalTo: 'Nhập lại mật khẩu không chính xác'
        }
    }
});

// validate form địa chỉ giao hàng
$('.shipping-default-form').validate({
    rules: {
        shipping_name: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i
        },
        shipping_mobile: {
            required: true,
            regex: /^0([0-9]{9,9})$/
        },
        housenumber_street: {
            required: true,
            maxlength: 100,
        },
        ward_id: {
            required: true
        },
        new_password: {
            required: true,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        },
        confirm_password: {
            equalTo: "#new_password"
        }
    },

    messages: {
        shipping_name: {
            required: 'Vui lòng nhập họ tên',
            maxlength: 'Vui lòng nhập họ tên không quá 50 ký tự',
            regex: 'Vui lòng không nhập số hoặc ký tự đặc biệt'
        },
        shipping_mobile: {
            required: 'Vui lòng nhập số điện thoại',
            regex: 'Vui lòng nhập đúng định dạng số điện thoại. vd: 0385548843'
        },
        housenumber_street: {
            required: 'Vui lòng nhập địa chỉ',
            maxlength: 'Vui lòng nhập địa chỉ không quá 100 ký tự',
        },
        ward_id: {
            required: 'Vui lòng chọn phường xã'
        },
        new_password: {
            required: 'Vui lòng nhập mật khẩu mới',
            regex: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
        },
        confirm_password: {
            equalTo: 'Nhập lại mật khẩu không chính xác'
        }
    }
});

// validate form checkout
$('.checkout-form').validate({
    rules: {
        shipping_fullname: {
            required: true,
            maxlength: 50,
            regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i
        },
        shipping_mobile: {
            required: true,
            regex: /^0([0-9]{9,9})$/
        },
        shipping_housenumber_street: {
            required: true,
            maxlength: 100,
        },
        shipping_ward_id: {
            required: true
        }
    },

    messages: {
        shipping_fullname: {
            required: 'Vui lòng nhập họ tên',
            maxlength: 'Vui lòng nhập họ tên không quá 50 ký tự',
            regex: 'Vui lòng không nhập số hoặc ký tự đặc biệt'
        },
        shipping_mobile: {
            required: 'Vui lòng nhập số điện thoại',
            regex: 'Vui lòng nhập đúng định dạng số điện thoại. vd: 0385548843'
        },
        shipping_housenumber_street: {
            required: 'Vui lòng nhập địa chỉ',
            maxlength: 'Vui lòng nhập địa chỉ không quá 100 ký tự',
        },
        shipping_ward_id: {
            required: 'Vui lòng chọn phường xã'
        }

    }
});


const changeProvince = document.querySelector('.checkout-form .choose_province');
console.log(changeProvince);
if (changeProvince) {
    changeProvince.onchange = () => {
        const id_province = changeProvince.value;
        const data = getCookie('cart');
        const dataJson = JSON.parse(data);
        if (id_province) {
            $.ajax({
                type: "GET",
                url: `/getShippingFee.html/${id_province}`,
                success: function (response) {
                    // alert(response);
                    // console.log(data);
                    const shippingFee = document.querySelector('.shippingfee_tmp');
                    // const totalPrice = document.querySelector('.total_price_cart');
                    const rsend = document.querySelector('.price_end');
                    shippingFee.innerHTML = formatVND(response);
                    rsend.innerHTML = formatVND(parseInt(dataJson.total_price) + parseInt(response));
                }
            });
        }
        else {
            const shippingFee = document.querySelector('.shippingfee_tmp');
            const rsend = document.querySelector('.price_end');
            shippingFee.innerHTML = '0 ₫';
            rsend.innerHTML = formatVND(parseInt(dataJson.total_price));
        }
    }
}

// update box selector địa chỉ
updateSelectBox2 = (selector, data) => {
    $(selector).find('option').not(':first').remove();
    if (!data) return;
    const tmp = data;
    for (const tmp1 of tmp) {
        const option = `<option value='${tmp1.id}'>${tmp1.name}</option>`;
        $(selector).append(option);
    }

}



// update thẻ select chọn tỉnh thành
$('select.choose_province').change(function () {
    const id_province = $(this).val();
    // console.log(id_province);
    if (id_province) {
        $.ajax({
            type: "GET",
            url: `/district.html/${id_province}`,
            success: function (data) {
                // console.log(data);
                updateSelectBox2('.choose_district', data);
                updateSelectBox2('.choose_ward', null);
            }
        });
    }
    else {
        updateSelectBox2('.choose_district', null);
        updateSelectBox2('.choose_ward', null);
    }
})

// update thẻ select chọn quận
$('select.choose_district').change(function () {
    const id_ward = $(this).val();
    if (id_ward) {
        $.ajax({
            type: "GET",
            url: `/ward.html/${id_ward}`,
            success: function (data) {
                // console.log(data);
                updateSelectBox2('.choose_ward', data);
            }
        });
    }
    else {
        // updateSelectBox2('.choose_district', null);
        updateSelectBox2('.choose_ward', null);
    }
})





