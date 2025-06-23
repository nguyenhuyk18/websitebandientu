const express = require('express');
const router = express.Router();
const checkLoginAdminSite = require('../middlewares/checkLoginAdminSite');
const checkPermisson = require('../middlewares/checkPermission');

// import controller
const DashboardController = require('../controllers/admin/DashboardController');
const BrandController = require('../controllers/admin/BrandController');
const CategoryController = require('../controllers/admin/CategoryController');
const LaptopController = require('../controllers/admin/LaptopController');
// const BrandCategoryController = require('../controllers/admin/BrandCategoryController');
const MouseController = require('../controllers/admin/MouseController');
const KeyboardController = require('../controllers/admin/KeyboardController');
const CustomerController = require('../controllers/admin/CustomerController');
const DistrictController = require('../controllers/admin/DistrictController');
const WardController = require('../controllers/admin/WardController');
const OrderController = require('../controllers/admin/OrderController');
const CommentController = require('../controllers/admin/CommentController');
const ProductController = require('../controllers/admin/ProductController');
const ImageItemController = require('../controllers/admin/ImageItemController');
const ActionController = require('../controllers/admin/ActionController');
const PermissionController = require('../controllers/admin/PermissionController');
const TransportController = require('../controllers/admin/TransportController');
const RoleController = require('../controllers/admin/RoleController');
const AuthController = require('../controllers/admin/AuthController');
const StaffController = require('../controllers/admin/StaffController');
// const PromotionController = require('../controllers/admin/PromotionController');
// // login
router.get('/login.html', AuthController.index);
router.post('/login', AuthController.login);
router.get('/logout.html', AuthController.logout);

// // thư viện upload ảnh
const uploadlaptop = require('../middlewares/uploadlaptop');
const uploadmouse = require('../middlewares/uploadmouse');
const uploadkeyboard = require('../middlewares/uploadkeyboard');
const uploadimageitem = require('../middlewares/uploadimageitem');


router.use(checkLoginAdminSite);

// trang chủ
router.get('/dashboard.html', DashboardController.index);

// thương hiệu
router.get('/brand.html', checkPermisson('view_brand'), BrandController.index);
router.get('/brand/create.html', checkPermisson('add_brand'), BrandController.create);
router.post('/brand/create', checkPermisson('add_brand'), BrandController.store);
router.get('/brand/delete/:id', checkPermisson('delete_brand'), BrandController.delete);
router.get('/brand/edit/:id', checkPermisson('edit_brand'), BrandController.edit);
router.post('/brand/update', checkPermisson('edit_brand'), BrandController.update);
// router.get('/brand-category.html/:id', checkPermisson('add_category_brand'), BrandController.provideCategory);
// router.post('/brand-category/create', checkPermisson('add_category_brand'), BrandController.saveCategoryOfBrand);


// danh mục
router.get('/category.html', checkPermisson('view_category'), CategoryController.index);
router.get('/category/create.html', checkPermisson('add_category'), CategoryController.create);
router.post('/category/create', checkPermisson('add_category'), CategoryController.store);
router.get('/category/delete/:id', checkPermisson('delete_category'), CategoryController.delete);
router.get('/category/edit/:id', checkPermisson('edit_category'), CategoryController.edit);
router.post('/category/update', checkPermisson('edit_category'), CategoryController.update);


// laptop
router.get('/laptop.html', checkPermisson('view_laptop'), LaptopController.index);
router.get('/laptop/create.html', checkPermisson('add_laptop'), LaptopController.create);
router.get('/laptop/edit/:id', checkPermisson('edit_laptop'), LaptopController.edit);
router.get('/laptop/delete/:id', checkPermisson('delete_laptop'), LaptopController.delete);
router.post('/laptop/create', checkPermisson('add_laptop'), uploadlaptop.single('image'), LaptopController.store);
router.post('/laptop/update', checkPermisson('edit_laptop'), uploadlaptop.single('image'), LaptopController.update);
router.get('/laptop/detail-:id.html', checkPermisson('view_laptop'), LaptopController.detail);

// mouse
router.get('/mouse.html', checkPermisson('view_mouse'), MouseController.index);
router.get('/mouse/create.html', checkPermisson('add_mouse'), MouseController.create);
router.get('/mouse/delete/:id', checkPermisson('delete_mouse'), MouseController.delete);
router.get('/mouse/edit/:id', checkPermisson('edit_mouse'), MouseController.edit);
router.post('/mouse/create', checkPermisson('add_mouse'), uploadmouse.single('image'), MouseController.store);
router.post('/mouse/update', checkPermisson('edit_mouse'), uploadmouse.single('image'), MouseController.update);
router.get('/mouse/detail-:id.html', checkPermisson('view_mouse'), MouseController.detail);

// keyboard
router.get('/keyboard.html', checkPermisson('view_keyboard'), KeyboardController.index);
router.get('/keyboard/create.html', checkPermisson('add_keyboard'), KeyboardController.create);
router.get('/keyboard/delete/:id', checkPermisson('delete_keyboard'), KeyboardController.delete);
router.get('/keyboard/edit/:id', checkPermisson('edit_keyboard'), KeyboardController.edit);
router.post('/keyboard/create', checkPermisson('add_keyboard'), uploadkeyboard.single('image'), KeyboardController.store)
router.post('/keyboard/update', checkPermisson('edit_keyboard'), uploadkeyboard.single('image'), KeyboardController.update);
router.get('/keyboard/detail-:id.html', checkPermisson('view_keyboard'), KeyboardController.detail);

// customer
router.get('/customer.html', checkPermisson('view_customer'), CustomerController.index);
router.get('/customer/create.html', checkPermisson('add_customer'), CustomerController.create)
router.get('/customer/delete/:id', checkPermisson('delete_customer'), CustomerController.delete);
router.get('/customer/edit/:id', checkPermisson('edit_customer'), CustomerController.edit);
router.post('/customer/create', checkPermisson('add_customer'), CustomerController.store);
router.post('/customer/update', checkPermisson('edit_customer'), CustomerController.update);
router.get('/customer/detail-:id.html', checkPermisson('view_customer'), CustomerController.detail);

// order
router.get('/order/create/view', checkPermisson('add_order'), OrderController.chooseCustomer)
router.get('/order.html', checkPermisson('view_order'), OrderController.index);
router.get('/order/create.html/:id', checkPermisson('add_order'), OrderController.create);
router.get('/order/item/:id', checkPermisson('add_order'), OrderController.findProductByID);
router.post('/order/create', checkPermisson('add_order'), OrderController.store);
router.get('/order/delete/:id', checkPermisson('delete_order'), OrderController.delete);
router.get('/order/edit/:id', checkPermisson('edit_order'), OrderController.edit);
router.post('/order/update', checkPermisson('edit_order'), OrderController.update);
router.get('/order/detail-:id.html', checkPermisson('view_order'), OrderController.detail);



// bình luận
router.get('/comment.html', checkPermisson('view_comment'), CommentController.index);
router.get('/comment/edit/:id', checkPermisson('edit_comment'), CommentController.edit);
router.get('/comment/delete/:id', checkPermisson('delete_comment'), CommentController.delete);
router.post('/comment/update', checkPermisson('edit_comment'), CommentController.update);


// image-item
router.get('/image-child.html', checkPermisson('view_image_item'), ProductController.index);
router.get('/image-item/detail/:id', checkPermisson('view_image_item'), ImageItemController.index);
router.get('/image-item/detail/delete/:id', checkPermisson('delete_image_item'), ImageItemController.delete);
router.post('/image-item/create', checkPermisson('add_image_item'), uploadimageitem.single('image'), ImageItemController.store);


// action
router.get('/action.html', checkPermisson('view_action'), ActionController.index);


// role 
router.get('/role.html', checkPermisson('view_role'), RoleController.index);
router.get('/role/create.html', checkPermisson('add_role'), RoleController.create);
router.post('/role/create', checkPermisson('add_role'), RoleController.store);
router.get('/role/delete/:id', checkPermisson('delete_role'), RoleController.delete);
router.get('/role/edit/:id', checkPermisson('edit_role'), RoleController.edit);
router.post('/role/update', checkPermisson('edit_role'), RoleController.update);

// staff
router.get('/staff.html', checkPermisson('view_staff'), StaffController.index);
router.get('/staff/create.html', checkPermisson('add_staff'), StaffController.create);
router.post('/staff/create', checkPermisson('add_staff'), StaffController.store);
router.get('/staff/delete/:id', checkPermisson('delete_staff'), StaffController.delete);
router.get('/staff/edit/:id', checkPermisson('edit_staff'), StaffController.edit);
router.post('/staff/update', checkPermisson('edit_staff'), StaffController.update);


// permission
router.get('/permission.html/:id', checkPermisson('permission'), PermissionController.index);
router.post('/permission/create', checkPermisson('permission'), PermissionController.store);

// transport
router.get('/transport.html', checkPermisson('view_shipping_fee'), TransportController.index);
router.get('/transport/edit/:id', checkPermisson('edit_shipping_fee'), TransportController.edit);
router.post('/transport/update', checkPermisson('edit_shipping_fee'), TransportController.update);

// promotion
// router.get('/promotion.html', PromotionController.index);
// router.get('/promotion/create.html', PromotionController.create);
// router.get('/promotion/choose-product-:id.html', PromotionController.listProductByCategory);
// router.post('/promotion/create', PromotionController.store);
// router.get('/promotion/delete/:id', PromotionController.delete);

// staff
// router.get('/staff.html', StaffController.index);
// router.get('/staff/create.html', StaffController.create);

// BrandCategory
// router.get('/brand-category/:id', BrandCategoryController.getCategory);


// district 
// xem district theo id province
router.get('/district.html/:id_province', DistrictController.getAll);


// ward 
// xem ward theo id district
router.get('/ward.html/:id_district', WardController.getAll);


router.get('/return-role-id', AuthController.returnRoleID);


// danh sách đơn hàng mới
router.get('/order-new.html', OrderController.new_order);

// Xuất router
module.exports = router;