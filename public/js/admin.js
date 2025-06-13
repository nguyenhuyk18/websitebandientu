

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

// set up xác nhận xóa dữ liệu
$('a.delete').click(function () {
    const giaTri = $(this).attr('data_href');
    $('.modal-footer a').attr('href', giaTri);
});

// -===============================VALIDATE===================================-//
// validate band
$(".create-brand").validate({
    rules: {
        name_brand: {
            required: true,
            maxlength: 20,
        },
    },

    messages: {
        name_brand: {
            required: 'Vui lòng nhập tên thương hiệu',
            maxlength: 'Vui lòng nhập không quá 20 ký tự',
        },
    }
});
$(".edit-brand").validate({
    rules: {
        name_brand: {
            required: true,
            maxlength: 20,
        },
    },

    messages: {
        name_brand: {
            required: 'Vui lòng nhập tên thương hiệu',
            maxlength: 'Vui lòng nhập không quá 20 ký tự',
        },
    }
});


// validate category
$(".create-category").validate({
    rules: {
        name_category: {
            required: true,
            maxlength: 20,
        },
    },

    messages: {
        name_category: {
            required: 'Vui lòng nhập tên danh mục',
            maxlength: 'Vui lòng nhập không quá 20 ký tự',
        },
    }
});
$(".edit-category").validate({
    rules: {
        name_category: {
            required: true,
            maxlength: 20,
        },
    },

    messages: {
        name_category: {
            required: 'Vui lòng nhập tên danh mục',
            maxlength: 'Vui lòng nhập không quá 20 ký tự',
        },
    }
});


//validate laptop
$('.create-laptop').validate({
    rules: {
        product_name: {
            required: true,
        },

        price: {
            required: true,
            regex: /^\d+$/
        },

        stock_quantity: {
            required: true,
            regex: /^\d+$/
        },

        image: {
            required: true,
            accept: "image/*"
        },

        discount: {
            regex: /^\d+$/
        },

        id_brand: {
            required: true
        },

        id_category: {
            required: true
        },

        cpu: {
            required: true
        },

        ram: {
            required: true
        },

        graphics_card: {
            required: true
        },

        screen_size: {
            required: true,
            regex: /^\d+$/
        },

        screen_solution: {
            required: true,
        },
        operating_system: {
            required: true
        },

        weight: {
            required: true,
            regex: /^(?:\d+|\d*\.\d+)$/
        },

        release_year: {
            required: true,
            regex: /^\d+$/
        },


        description: {
            required: true,
        },
    },

    messages: {
        product_name: {
            required: 'Vui lòng nhập tên sản phẩm',
        },
        price: {
            required: 'Vui lòng nhập giá sản phẩm',
            regex: 'Vui lòng nhập giá sản phẩm hợp lệ',
        },
        stock_quantity: {
            required: 'Vui lòng nhập số lượng sản phẩm',
            regex: 'Vui lòng nhập số lượng sản phẩm hợp lệ',
        },
        image: {
            required: 'Vui lòng chọn ảnh sản phẩm',
            accept: 'Vui lòng chọn ảnh định dạng là hình ảnh'
        },
        discount: {
            regex: 'Vui lòng nhập giảm giá hợp lệ',
        },
        id_brand: {
            required: 'Vui lòng chọn thương hiệu',
        },
        id_category: {
            required: 'Vui lòng chọn danh mục',
        },
        cpu: {
            required: 'Vui lòng nhập thông tin CPU',
        },
        ram: {
            required: 'Vui lòng nhập thông tin RAM',
        },
        graphics_card: {
            required: 'Vui lòng nhập thông tin card đồ họa',
        },
        screen_size: {
            required: 'Vui lòng nhập kích thước màn hình',
            regex: 'Vui lòng nhập kích thước màn hình hợp lệ'
        },
        screen_solution: {
            required: 'Vui lòng nhập độ phân giải màn hình',
        },
        operating_system: {
            required: 'Vui lòng nhập hệ điều hành',
        },
        weight: {
            required: 'Vui lòng nhập trọng lượng',
            regex: 'Vui lòng nhập trọng lượng hợp lệ'
        },
        release_year: {
            required: 'Vui lòng nhập năm phát hành',
            regex: 'Vui lòng nhập năm phát hành hợp lệ'
        },
        description: {
            required: 'Vui lòng nhập mô tả',
        }
    }
})
$('.edit-laptop').validate({
    rules: {
        product_name: {
            required: true,
        },

        price: {
            required: true,
            regex: /^\d+$/
        },

        stock_quantity: {
            required: true,
            regex: /^\d+$/
        },

        image: {
            // required: true,
            accept: "image/*"
        },

        discount: {
            regex: /^\d+$/
        },

        id_brand: {
            required: true
        },

        id_category: {
            required: true
        },

        cpu: {
            required: true
        },

        ram: {
            required: true
        },

        graphics_card: {
            required: true
        },

        screen_size: {
            required: true,
            regex: /^\d+$/
        },

        screen_solution: {
            required: true,
        },
        operating_system: {
            required: true
        },

        weight: {
            required: true,
            regex: /^(?:\d+|\d*\.\d+)$/
        },

        release_year: {
            required: true,
            regex: /^\d+$/
        },


        description: {
            required: true,
        },
    },

    messages: {
        product_name: {
            required: 'Vui lòng nhập tên sản phẩm',
        },
        price: {
            required: 'Vui lòng nhập giá sản phẩm',
            regex: 'Vui lòng nhập giá sản phẩm hợp lệ',
        },
        stock_quantity: {
            required: 'Vui lòng nhập số lượng sản phẩm',
            regex: 'Vui lòng nhập số lượng sản phẩm hợp lệ',
        },
        image: {
            required: 'Vui lòng chọn ảnh sản phẩm',
            accept: 'Vui lòng chọn ảnh định dạng là hình ảnh'
        },
        discount: {
            regex: 'Vui lòng nhập giảm giá hợp lệ',
        },
        id_brand: {
            required: 'Vui lòng chọn thương hiệu',
        },
        id_category: {
            required: 'Vui lòng chọn danh mục',
        },
        cpu: {
            required: 'Vui lòng nhập thông tin CPU',
        },
        ram: {
            required: 'Vui lòng nhập thông tin RAM',
        },
        graphics_card: {
            required: 'Vui lòng nhập thông tin card đồ họa',
        },
        screen_size: {
            required: 'Vui lòng nhập kích thước màn hình',
            regex: 'Vui lòng nhập kích thước màn hình hợp lệ'
        },
        screen_solution: {
            required: 'Vui lòng nhập độ phân giải màn hình',
        },
        operating_system: {
            required: 'Vui lòng nhập hệ điều hành',
        },
        weight: {
            required: 'Vui lòng nhập trọng lượng',
            regex: 'Vui lòng nhập trọng lượng hợp lệ'
        },
        release_year: {
            required: 'Vui lòng nhập năm phát hành',
            regex: 'Vui lòng nhập năm phát hành hợp lệ'
        },
        description: {
            required: 'Vui lòng nhập mô tả',
        }
    }
})

//validate mouse
$('.create-mouse').validate({
    rules: {
        product_name: {
            required: true,
        },

        price: {
            required: true,
            regex: /^\d+$/
        },

        stock_quantity: {
            required: true,
            regex: /^\d+$/
        },

        image: {
            required: true,
            accept: "image/*"
        },

        discount: {
            regex: /^\d+$/
        },

        connection_type: {
            required: true
        },

        led: {
            required: true
        },

        warranty: {
            required: true,
            regex: /^\d+$/,
            min: 1,
            max: 12
        },

        color: {
            required: true
        },


        DPI: {
            required: true,
            regex: /^\d+$/
        },

        id_brand: {
            required: true
        },

        id_category: {
            required: true
        },
        weight: {
            required: true,
            regex: /^(?:\d+|\d*\.\d+)$/
        },

        description: {
            required: true,
        },
    },

    messages: {
        product_name: {
            required: 'Vui lòng nhập tên sản phẩm',
        },
        price: {
            required: 'Vui lòng nhập giá sản phẩm',
            regex: 'Vui lòng nhập giá sản phẩm hợp lệ',
        },
        stock_quantity: {
            required: 'Vui lòng nhập số lượng sản phẩm',
            regex: 'Vui lòng nhập số lượng sản phẩm hợp lệ',
        },
        image: {
            required: 'Vui lòng chọn ảnh sản phẩm',
            accept: 'Vui lòng chọn ảnh định dạng là hình ảnh'
        },
        discount: {
            regex: 'Vui lòng nhập giảm giá hợp lệ',
        },
        id_brand: {
            required: 'Vui lòng chọn thương hiệu',
        },
        id_category: {
            required: 'Vui lòng chọn danh mục',
        },

        connection_type: {
            required: 'Vui lòng nhập kiểu kết nối',
        },
        led: {
            required: 'Vui lòng nhập thông tin đèn LED',
        },
        warranty: {
            required: 'Vui lòng nhập thời gian bảo hành',
            regex: 'Vui lòng nhập thời gian bảo hành hợp lệ',
            min: 'Thời gian bảo hành tối thiểu là 1 tháng',
            max: 'Thời gian bảo hành tối đa là 12 tháng',
        },
        color: {
            required: 'Vui lòng nhập màu sắc',
        },

        DPI: {
            required: 'Vui lòng nhập thông số DPI',
            regex: 'Vui lòng nhập thông số DPI hợp lệ',
        },



        weight: {
            required: 'Vui lòng nhập trọng lượng',
            regex: 'Vui lòng nhập trọng lượng hợp lệ'
        },
        description: {
            required: 'Vui lòng nhập mô tả',
        }
    }
})
$('.edit-mouse').validate({
    rules: {
        product_name: {
            required: true,
        },

        price: {
            required: true,
            regex: /^\d+$/
        },

        stock_quantity: {
            required: true,
            regex: /^\d+$/
        },

        image: {
            required: true,
            accept: "image/*"
        },

        discount: {
            regex: /^\d+$/
        },

        connection_type: {
            required: true
        },

        led: {
            required: true
        },

        warranty: {
            required: true,
            regex: /^\d+$/,
            min: 1,
            max: 12
        },

        color: {
            required: true
        },


        DPI: {
            required: true,
            regex: /^\d+$/
        },

        id_brand: {
            required: true
        },

        id_category: {
            required: true
        },
        weight: {
            required: true,
            regex: /^(?:\d+|\d*\.\d+)$/
        },

        description: {
            required: true,
        },
    },

    messages: {
        product_name: {
            required: 'Vui lòng nhập tên sản phẩm',
        },
        price: {
            required: 'Vui lòng nhập giá sản phẩm',
            regex: 'Vui lòng nhập giá sản phẩm hợp lệ',
        },
        stock_quantity: {
            required: 'Vui lòng nhập số lượng sản phẩm',
            regex: 'Vui lòng nhập số lượng sản phẩm hợp lệ',
        },
        image: {
            required: 'Vui lòng chọn ảnh sản phẩm',
            accept: 'Vui lòng chọn ảnh định dạng là hình ảnh'
        },
        discount: {
            regex: 'Vui lòng nhập giảm giá hợp lệ',
        },
        id_brand: {
            required: 'Vui lòng chọn thương hiệu',
        },
        id_category: {
            required: 'Vui lòng chọn danh mục',
        },

        connection_type: {
            required: 'Vui lòng nhập kiểu kết nối',
        },
        led: {
            required: 'Vui lòng nhập thông tin đèn LED',
        },
        warranty: {
            required: 'Vui lòng nhập thời gian bảo hành',
            regex: 'Vui lòng nhập thời gian bảo hành hợp lệ',
            min: 'Thời gian bảo hành tối thiểu là 1 tháng',
            max: 'Thời gian bảo hành tối đa là 12 tháng',
        },
        color: {
            required: 'Vui lòng nhập màu sắc',
        },

        DPI: {
            required: 'Vui lòng nhập thông số DPI',
            regex: 'Vui lòng nhập thông số DPI hợp lệ',
        },



        weight: {
            required: 'Vui lòng nhập trọng lượng',
            regex: 'Vui lòng nhập trọng lượng hợp lệ'
        },
        description: {
            required: 'Vui lòng nhập mô tả',
        }
    }
})

//validate keyboard
$('.create-keyboard').validate({
    rules: {
        product_name: {
            required: true,
        },

        price: {
            required: true,
            regex: /^\d+$/
        },

        stock_quantity: {
            required: true,
            regex: /^\d+$/
        },

        image: {
            required: true,
            accept: "image/*"
        },

        discount: {
            regex: /^\d+$/
        },

        id_brand: {
            required: true
        },

        id_category: {
            required: true
        },

        key_durability: {
            required: true,
            regex: /^\d+$/
        },

        size: {
            required: true,
        },

        weight: {
            required: true,
            regex: /^(?:\d+|\d*\.\d+)$/,
        },

        description: {
            required: true,
        },
    },

    messages: {
        size: {
            required: 'Vui lòng nhập kích thước',
        },
        product_name: {
            required: 'Vui lòng nhập tên sản phẩm',
        },
        price: {
            required: 'Vui lòng nhập giá sản phẩm',
            regex: 'Vui lòng nhập giá sản phẩm hợp lệ',
        },
        stock_quantity: {
            required: 'Vui lòng nhập số lượng sản phẩm',
            regex: 'Vui lòng nhập số lượng sản phẩm hợp lệ',
        },
        image: {
            required: 'Vui lòng chọn ảnh sản phẩm',
            accept: 'Vui lòng chọn ảnh định dạng là hình ảnh'
        },
        discount: {
            regex: 'Vui lòng nhập giảm giá hợp lệ',
        },
        id_brand: {
            required: 'Vui lòng chọn thương hiệu',
        },
        id_category: {
            required: 'Vui lòng chọn danh mục',
        },

        key_durability: {
            required: 'Vui lòng nhập độ bền phím',
            regex: 'Vui lòng nhập độ bền phím hợp lệ',
        },




        weight: {
            required: 'Vui lòng nhập trọng lượng',
            regex: 'Vui lòng nhập trọng lượng hợp lệ'
        },
        description: {
            required: 'Vui lòng nhập mô tả',
        }
    }
})
$('.edit-keyboard').validate({
    rules: {
        product_name: {
            required: true,
        },

        price: {
            required: true,
            regex: /^\d+$/
        },

        stock_quantity: {
            required: true,
            regex: /^\d+$/
        },

        image: {
            required: true,
            accept: "image/*"
        },

        discount: {
            regex: /^\d+$/
        },

        id_brand: {
            required: true
        },

        id_category: {
            required: true
        },

        key_durability: {
            required: true,
            regex: /^\d+$/
        },

        size: {
            required: true,
        },

        weight: {
            required: true,
            regex: /^(?:\d+|\d*\.\d+)$/,
        },

        description: {
            required: true,
        },
    },

    messages: {
        size: {
            required: 'Vui lòng nhập kích thước',
        },
        product_name: {
            required: 'Vui lòng nhập tên sản phẩm',
        },
        price: {
            required: 'Vui lòng nhập giá sản phẩm',
            regex: 'Vui lòng nhập giá sản phẩm hợp lệ',
        },
        stock_quantity: {
            required: 'Vui lòng nhập số lượng sản phẩm',
            regex: 'Vui lòng nhập số lượng sản phẩm hợp lệ',
        },
        image: {
            required: 'Vui lòng chọn ảnh sản phẩm',
            accept: 'Vui lòng chọn ảnh định dạng là hình ảnh'
        },
        discount: {
            regex: 'Vui lòng nhập giảm giá hợp lệ',
        },
        id_brand: {
            required: 'Vui lòng chọn thương hiệu',
        },
        id_category: {
            required: 'Vui lòng chọn danh mục',
        },

        key_durability: {
            required: 'Vui lòng nhập độ bền phím',
            regex: 'Vui lòng nhập độ bền phím hợp lệ',
        },




        weight: {
            required: 'Vui lòng nhập trọng lượng',
            regex: 'Vui lòng nhập trọng lượng hợp lệ'
        },
        description: {
            required: 'Vui lòng nhập mô tả',
        }
    }
})

// validate khách hàng
$('.create-customer').validate({
    rules: {
        username: {
            required: true,
            regex: /^[a-zA-Z0-9_]+$/,
        },

        name: {
            required: true,
        },

        phone: {
            required: true,
            regex: /^\d{10}$/
        },

        email: {
            required: true,
            email: true,
        },

        province_id: {
            required: true
        },

        district_id: {
            required: true
        },

        ward_id: {
            required: true
        },

        housenumber_street: {
            required: true,

        },

        shipping_name: {
            required: true,
        },

        shipping_mobile: {
            required: true,
            regex: /^\d{10}$/
        },

        status: {
            required: true,
        },
    },

    messages: {
        username: {
            required: 'Vui lòng nhập tên đăng nhập',
            regex: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới',
        },
        name: {
            required: 'Vui lòng nhập tên khách hàng',
        },
        phone: {
            required: 'Vui lòng nhập số điện thoại',
            regex: 'Số điện thoại phải là 10 chữ số',
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'Vui lòng nhập email hợp lệ',
        },
        province_id: {
            required: 'Vui lòng chọn tỉnh thành',
        },
        district_id: {
            required: 'Vui lòng chọn quận huyện',
        },
        ward_id: {
            required: 'Vui lòng chọn phường xã',
        },
        housenumber_street: {
            required: 'Vui lòng nhập địa chỉ nhà số, đường',
        },
        shipping_name: {
            required: 'Vui lòng nhập tên người nhận hàng',
        },
        shipping_mobile: {
            required: 'Vui lòng nhập số điện thoại người nhận hàng',
            regex: 'Số điện thoại người nhận hàng phải là 10 chữ số',
        },
        status: {
            required: 'Vui lòng chọn trạng thái khách hàng',
        },
    }
})
$('.edit-customer').validate({
    rules: {
        username: {
            required: true,
            regex: /^[a-zA-Z0-9_]+$/,
        },

        name: {
            required: true,
        },

        phone: {
            required: true,
            regex: /^\d{10}$/
        },

        email: {
            required: true,
            email: true,
        },

        province_id: {
            required: true
        },

        district_id: {
            required: true
        },

        ward_id: {
            required: true
        },

        housenumber_street: {
            required: true,

        },

        shipping_name: {
            required: true,
        },

        shipping_mobile: {
            required: true,
            regex: /^\d{10}$/
        },

        status: {
            required: true,
        },
    },

    messages: {
        username: {
            required: 'Vui lòng nhập tên đăng nhập',
            regex: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới',
        },
        name: {
            required: 'Vui lòng nhập tên khách hàng',
        },
        phone: {
            required: 'Vui lòng nhập số điện thoại',
            regex: 'Số điện thoại phải là 10 chữ số',
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'Vui lòng nhập email hợp lệ',
        },
        province_id: {
            required: 'Vui lòng chọn tỉnh thành',
        },
        district_id: {
            required: 'Vui lòng chọn quận huyện',
        },
        ward_id: {
            required: 'Vui lòng chọn phường xã',
        },
        housenumber_street: {
            required: 'Vui lòng nhập địa chỉ nhà số, đường',
        },
        shipping_name: {
            required: 'Vui lòng nhập tên người nhận hàng',
        },
        shipping_mobile: {
            required: 'Vui lòng nhập số điện thoại người nhận hàng',
            regex: 'Số điện thoại người nhận hàng phải là 10 chữ số',
        },
        status: {
            required: 'Vui lòng chọn trạng thái khách hàng',
        },
    }
})


// validate đơn hàng
$('.create-order').validate({
    rules: {
        shipping_fullname: {
            required: true,
        },
        shipping_mobile: {
            required: true,
            regex: /^\d{10}$/
        },

        payment_method: {
            required: true,
        },

        province_id: {
            required: true
        },

        district_id: {
            required: true
        },

        shipping_ward_id: {
            required: true
        },


        shipping_housenumber_street: {
            required: true,
        },

        order_status_id: {
            required: true,
        }
    },

    messages: {
        shipping_fullname: {
            required: 'Vui lòng nhập tên người nhận hàng',
        },

        shipping_mobile: {
            required: 'Vui lòng nhập số điện thoại người nhận hàng',
            regex: 'Số điện thoại người nhận hàng phải là 10 chữ số',
        },

        payment_method: {
            required: 'Vui lòng chọn phương thức thanh toán',
        },

        province_id: {
            required: 'Vui lòng chọn tỉnh thành',
        },

        district_id: {
            required: 'Vui lòng chọn quận huyện',
        },

        shipping_ward_id: {
            required: 'Vui lòng chọn phường xã',
        },

        shipping_housenumber_street: {
            required: 'Vui lòng nhập địa chỉ nhà số, đường',
        },

        order_status_id: {
            required: 'Vui lòng chọn trạng thái đơn hàng',
        }
    }
})

$('.edit-order').validate({
    rules: {
        shipping_fullname: {
            required: true,
        },
        shipping_mobile: {
            required: true,
            regex: /^\d{10}$/
        },

        payment_method: {
            required: true,
        },

        province_id: {
            required: true
        },

        district_id: {
            required: true
        },

        shipping_ward_id: {
            required: true
        },


        shipping_housenumber_street: {
            required: true,
        },

        order_status_id: {
            required: true,
        }
    },

    messages: {
        shipping_fullname: {
            required: 'Vui lòng nhập tên người nhận hàng',
        },

        shipping_mobile: {
            required: 'Vui lòng nhập số điện thoại người nhận hàng',
            regex: 'Số điện thoại người nhận hàng phải là 10 chữ số',
        },

        payment_method: {
            required: 'Vui lòng chọn phương thức thanh toán',
        },

        province_id: {
            required: 'Vui lòng chọn tỉnh thành',
        },

        district_id: {
            required: 'Vui lòng chọn quận huyện',
        },

        shipping_ward_id: {
            required: 'Vui lòng chọn phường xã',
        },

        shipping_housenumber_street: {
            required: 'Vui lòng nhập địa chỉ nhà số, đường',
        },

        order_status_id: {
            required: 'Vui lòng chọn trạng thái đơn hàng',
        }
    }
})


// validate comment

$('.edit-comment').validate({
    rules: {
        fullname: {
            required: true,
        },

        email: {
            required: true,
            email: true,
        },

        star: {
            required: true,
            regex: /^[1-5]$/
        },

        description: {
            required: true,
        }
    },

    messages: {
        fullname: {
            required: 'Vui lòng nhập họ tên',
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'Email không hợp lệ',
        },
        star: {
            required: 'Vui lòng chọn số sao',
            regex: 'Số sao phải từ 1 đến 5',
        },
        description: {
            required: 'Vui lòng nhập mô tả',
        }
    },

});

// validate image_item

$('.create-image-item').validate({
    rules: {
        image: {
            required: true,
            accept: "image/*"
        }
    },

    messages: {
        image: {
            required: 'Vui lòng chọn hình ảnh',
            accept: 'Định dạng tệp không hợp lệ'
        }
    },
});

//validate role

$('.create-role').validate({
    rules: {
        name_role: {
            required: true,
            minlength: 2,
            maxlength: 100
        }
    },

    messages: {
        name_role: {
            required: 'Vui lòng nhập tên vai trò',
            minlength: 'Tên vai trò phải có ít nhất 2 ký tự',
            maxlength: 'Tên vai trò không được vượt quá 100 ký tự'
        }
    }
});

// validate shipping fee
$('.edit-transport').validate({
    rules: {
        price: {
            required: true,
            min: 0,
            regex: /^\d+$/
        }
    },

    messages: {
        price: {
            required: 'Vui lòng nhập phí vận chuyển',
            min: 'Phí vận chuyển phải lớn hơn hoặc bằng 0',
            regex: 'Phí vận chuyển phải là số nguyên dương'
        }
    }
});

//validate staff
$('.create-staff').validate({
    rules: {
        username: {
            required: true,
            regex: /^[a-zA-Z0-9_]+$/,
        },

        name: {
            required: true,
        },

        mobile: {
            required: true,
            regex: /^\d{10}$/
        },

        email: {

            required: true,
            email: true,
        },

        is_active: {
            required: true,
        },

        role_id: {
            required: true,
        },

    },

    messages: {
        username: {
            required: 'Vui lòng nhập tên đăng nhập',
            regex: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới',
        },
        name: {
            required: 'Vui lòng nhập tên nhân viên',
        },
        mobile: {
            required: 'Vui lòng nhập số điện thoại',
            regex: 'Số điện thoại phải là 10 chữ số',
        },
        email: {
            required: 'Vui lòng nhập email',
            email: 'Vui lòng nhập email hợp lệ',
        },
        is_active: {
            required: 'Vui lòng chọn trạng thái hoạt động',
        },
        role_id: {
            required: 'Vui lòng chọn vai trò',
        },
    },


});

// -===============================VALIDATE===================================-//

// update box selector brand thương hiệu
updateSelectBox = (selector, data) => {
    $(selector).find('option').not(':first').remove();
    if (!data) return;
    const tmp = data;
    for (const tmp1 of tmp) {
        const option = `<option value='${tmp1.id}'>${tmp1.name_category}</option>`;
        $(selector).append(option);
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

// Update thẻ select chọn thương hiệu
$('select.choosebrand').change(function () {
    const id_brand = $(this).val();
    console.log(id_brand);
    if (id_brand) {
        $.ajax({
            type: "GET",
            url: `/admin/brand-category/${id_brand}`,
            // data: "data",
            // dataType: "dataType",
            success: function (data) {
                // console.log(data);
                updateSelectBox('select.choosecategory', data);
            }
        });
    } else {
        updateSelectBox('select.choosecategory', null);
    }
});

// update thẻ select chọn tỉnh thành
$('select.choose_province').change(function () {
    const id_province = $(this).val();
    // console.log(id_province);
    if (id_province) {
        $.ajax({
            type: "GET",
            url: `/admin/district.html/${id_province}`,
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
            url: `/admin/ward.html/${id_ward}`,
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



// ================================ ORDER ===================================
// sep up thêm order_item
$('.addorderitem').click(function () {
    const giaTri = $('input.product_id').val();
    // console.log(giaTri);
    $.ajax({
        type: "GET",
        url: `/admin/order/item/${giaTri}`,
        success: function (response) {
            if (response == false) {
                alert(`mã sản phẩm ${giaTri} không tồn tại !!!`);
            }
            else {
                updateTableProduct(response);
            }
        }
    });
    $('input.product_id').val("");
})

addProductOrder = (id_prodoct, unitprice) => {
    const id_product = document.querySelectorAll('table.table-item-order tbody tr td:first-child');

    for (const tmp in id_product) {
        if (id_product[tmp].innerHTML == id_prodoct) {
            const rs = document.querySelectorAll('table.table-item-order span.qtyproductorder');
            const rs1 = document.querySelectorAll('table.table-item-order input.qtyproductorder');
            const total = document.querySelectorAll('table.table-item-order tbody tr td.total-price');
            rs[tmp].innerHTML = Number(rs[tmp].innerHTML) + 1;
            rs1[tmp].value = rs[tmp].innerHTML;
            total[tmp].innerHTML = formatVND(Number(rs[tmp].innerHTML) * Number(unitprice));
            return;
        }
    }
}

// Xóa sản phẩm khỏi order
deleteProductOrder = (data, unitprice) => {
    // alert(data);
    const id_product = document.querySelectorAll('table.table-item-order tbody tr td:first-child');

    for (const tmp in id_product) {
        if (data == id_product[tmp].innerHTML) {
            const rs = document.querySelectorAll('table.table-item-order span.qtyproductorder');
            const rs1 = document.querySelectorAll('table.table-item-order input.qtyproductorder');
            const total = document.querySelectorAll('table.table-item-order tbody tr td.total-price');
            if (Number(rs[tmp].innerHTML) > 1) {
                rs[tmp].innerHTML = Number(rs[tmp].innerHTML) - 1;
                rs1[tmp].value = rs[tmp].innerHTML;
                total[tmp].innerHTML = formatVND(Number(rs[tmp].innerHTML) * Number(unitprice));
            }
            else {
                $(`table.table-item-order tbody tr:nth-child(${Number(tmp) + 1})`).remove();
            }

            return;
        }
    }
}

// update sản phẩm khỏi order
updateTableProduct = (data) => {
    const id_product = document.querySelectorAll('table.table-item-order tbody tr td:first-child');

    // console.log(id_product.innerHTML);

    for (const tmp in id_product) {

        if (data.id == id_product[tmp].innerHTML) {
            const rs = document.querySelectorAll('table.table-item-order span.qtyproductorder');
            const rs1 = document.querySelectorAll('table.table-item-order input.qtyproductorder');
            const total = document.querySelectorAll('table.table-item-order tbody tr td.total-price')
            rs[tmp].innerHTML = Number(rs[tmp].innerHTML) + 1;
            rs1[tmp].value = rs[tmp].innerHTML;
            total[tmp].innerHTML = formatVND(Number(rs[tmp].innerHTML) * Number(data.price));
            return;
        }
    }

    const html = `<tr>
                <td>${data.id}</td>
                <td>${data.product_name}</td>
                <td> <img src="/upload/product/${data.image}" class="w-100" alt=""> </td>
                <td class="unitprice">${formatVND(data.price)}</td>
                <td><span class="qtyproductorder">1</span><input  type="hidden" name="qty" class="qtyproductorder" value="1"><input  type="hidden" name="id" class="idproductorder" value="${data.id}"></td>
                <td class="total-price">${formatVND(data.price)}</td>
                <td><button type="button" onclick="deleteProductOrder(${data.id} , ${data.price})" class="btn btn-danger btn-sm deleteproductorder">(-)</button></td>
                <td><button type="button" onclick="addProductOrder(${data.id} , ${data.price})" class="saveproductorder btn btn-primary btn-sm">(+)</button></td>
              </tr>`
    $('table.table-item-order tbody').append(html);
}
// ================================ ORDER ===================================
// Hiển thị tên file đã chọn
$(document).on('change', '.custom-file-input', function (e) {
    var file = e.target.files[0];
    var $label = $(this).next('.custom-file-label');
    if (file) {
        // Kiểm tra file có phải ảnh không
        if (!file.type.match('image.*')) {
            // Nếu không phải ảnh, reset input và label
            $(this).val('');
            $label.val("Chọn ảnh sản phẩm...").html("Chọn ảnh sản phẩm...");
        } else {
            // Nếu là ảnh, cập nhật tên file
            $label.val(file.name).html(file.name);
        }
    } else {
        // Nếu không có file, reset label
        $label.val("Chọn ảnh sản phẩm...").html("Chọn ảnh sản phẩm...");
    }
});


$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);


$.validator.addMethod("accept", function (value, element, param) {
    // Nếu không chọn file thì bỏ qua (để required xử lý)
    if (element.files.length === 0) return true;
    // Kiểm tra mime type
    for (let i = 0; i < element.files.length; i++) {
        if (!element.files[i].type.match(param)) {
            return false;
        }
    }
    return true;
}, "Chỉ được phép chọn tệp hình ảnh.");

function formatVND(amount) {
    amount = parseInt(amount); // Đảm bảo là số nguyên
    return amount.toLocaleString('vi-VN') + ' ₫';
}

// thẻ input 



