document.addEventListener("DOMContentLoaded", () => {
    
    // ===================================================
    // HEADER & NAVIGATION LOGIC (Runs on all pages)
    // ===================================================
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileNavSidebar = document.getElementById("mobile-nav-sidebar");
    const mobileNavClose = document.getElementById("mobile-nav-close");
    
    if (mobileMenuToggle && mobileNavSidebar && mobileNavClose) {
        mobileMenuToggle.addEventListener("click", () => mobileNavSidebar.classList.add("open"));
        mobileNavClose.addEventListener("click", () => mobileNavSidebar.classList.remove("open"));
    }

    const updateHeaderUI = () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const desktopUserActions = document.getElementById('header-user-actions');
        const mobileUserSection = document.getElementById('mobile-user-section');
        const mobileNavLinks = document.querySelector('.mobile-nav-links');

        if (mobileNavLinks) {
            mobileNavLinks.innerHTML = `
                <a href="index.html"><i class="fa-solid fa-house"></i> Home</a>
                <a href="index.html#about"><i class="fa-solid fa-circle-info"></i> About</a>
                <a href="index.html#product"><i class="fa-solid fa-box-open"></i> Products</a>
                <a href="#" id="mobile-wishlist-btn"><i class="fa-regular fa-heart"></i> Wishlist</a>
            `;
            if (loggedInUser) {
                 mobileNavLinks.innerHTML += `<a href="my-orders.html"><i class="fa-solid fa-receipt"></i> My Orders</a>`;
            }
        }

        if (loggedInUser) { // User is LOGGED IN
            if (desktopUserActions) {
                desktopUserActions.innerHTML = `
                    <div class="main-nav">
                        <a href="index.html">HOME</a>
                        <a href="index.html#about">ABOUT</a>
                        <a href="index.html#product">PRODUCTS</a>
                    </div>
                    <div class="user-info">
                        <span>Welcome, ${loggedInUser}!</span>
                    </div>
                    <a href="my-orders.html" class="icon-link" title="My Orders"><i class="fa-solid fa-receipt"></i></a>
                    <button class="wishlist-btn" id="wishlist-toggle"><i class="fa-regular fa-heart"></i></button>
                    <button id="logout-btn" class="btn">Logout</button>
                `;
                document.getElementById('logout-btn').addEventListener('click', () => {
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'index.html';
                });
            }
            if (mobileUserSection) {
                mobileUserSection.innerHTML = `
                    <div class="user-info-mobile">Welcome, ${loggedInUser}!</div>
                    <button id="mobile-logout-btn" class="btn">Logout</button>
                `;
                document.getElementById('mobile-logout-btn').addEventListener('click', () => {
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'index.html';
                });
            }
        } else { // User is LOGGED OUT
            if (desktopUserActions) {
                desktopUserActions.innerHTML = `
                    <div class="main-nav">
                        <a href="index.html">HOME</a>
                        <a href="index.html#about">ABOUT</a>
                        <a href="index.html#product">PRODUCTS</a>
                    </div>
                    <a href="login.html" class="icon-link" title="Login / Register"><i class="fa-solid fa-user"></i></a>
                    <button class="wishlist-btn" id="wishlist-toggle"><i class="fa-regular fa-heart"></i></button>
                `;
            }
             if (mobileUserSection) {
                mobileUserSection.innerHTML = `
                    <a href="login.html" class="btn btn-primary">Login</a>
                    <a href="register.html" class="btn">Register</a>
                `;
            }
        }
    };
    updateHeaderUI();

    document.body.addEventListener('click', function(event) {
        if (event.target.id === 'mobile-wishlist-btn' || event.target.parentElement.id === 'mobile-wishlist-btn') {
            event.preventDefault();
            document.getElementById('wishlist-sidebar')?.classList.add('open');
            document.getElementById('mobile-nav-sidebar')?.classList.remove('open');
        }
    });

    const showAuthMessage = (message, type) => {
        const messageContainer = document.getElementById('auth-message');
        if (messageContainer) {
            messageContainer.textContent = message;
            messageContainer.className = type;
        }
    };

    // ===================================================
    // INDEX PAGE LOGIC (`index.html`)
    // ===================================================
    if (document.body.contains(document.getElementById('product'))) {
        const wishlistToggle = document.getElementById("wishlist-toggle");
        const wishlistSidebar = document.getElementById("wishlist-sidebar");
        const wishlistClose = document.getElementById("wishlist-close");
        if (wishlistToggle) wishlistToggle.addEventListener("click", () => wishlistSidebar.classList.add("open"));
        if (wishlistClose) wishlistClose.addEventListener("click", () => wishlistSidebar.classList.remove("open"));
        
        const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
        const wishlistItemsContainer = document.getElementById("wishlist-items");
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const updateWishlistUI = () => {
            wishlistItemsContainer.innerHTML = wishlist.length === 0 ? "<p>Your wishlist is empty.</p>" : wishlist.map(item => `
                <div class="wishlist-item"><p>${item.name}</p><button class="remove-wishlist-item" data-product-id="${item.id}">&times;</button></div>
            `).join('');
        };
        addToWishlistButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const { productId, productName } = e.target.dataset;
                if (!wishlist.some(item => item.id === productId)) {
                    wishlist.push({ id: productId, name: productName });
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    updateWishlistUI();
                    alert(`${productName} added to wishlist!`);
                } else {
                    alert(`${productName} is already in wishlist.`);
                }
            });
        });
        wishlistItemsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove-wishlist-item")) {
                const { productId } = e.target.dataset;
                wishlist = wishlist.filter(item => item.id !== productId);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                updateWishlistUI();
            }
        });
        updateWishlistUI();

        document.querySelectorAll('.order-now').forEach(button => {
            button.addEventListener('click', (event) => {
                if (!localStorage.getItem('loggedInUser')) {
                    event.preventDefault();
                    alert('Please log in to place an order.');
                    window.location.href = `login.html?redirectTo=${encodeURIComponent(event.currentTarget.href)}`;
                }
            });
        });
    }

    // ===================================================
    // ORDER PAGE LOGIC (`order.html`)
    // ===================================================
    if (window.location.pathname.includes('order.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = allProducts.find(p => p.id == productId);

        if (product) {
            const formattedPrice = `Rs. ${product.price.toLocaleString('en-IN')}`;
            document.getElementById('order-product-image').src = product.imageSrc;
            document.getElementById('order-product-image').alt = product.name;
            document.getElementById('order-product-name').textContent = product.name;
            document.getElementById('order-product-price').textContent = formattedPrice;
            document.getElementById('order-total-amount').textContent = formattedPrice;
            const specsEl = document.getElementById('order-product-specs');
            specsEl.innerHTML = Object.entries(product.details).map(([key, value]) => `
                <div class="spec-item"><span>${key}</span><span>${value}</span></div>
            `).join('');
        } else {
            document.querySelector('.order-grid').innerHTML = '<h2>Error: Product not found.</h2>';
        }

        const orderForm = document.getElementById('order-form');
        if (orderForm) {
            orderForm.addEventListener('submit', (event) => {
                event.preventDefault();
                if (orderForm.checkValidity()) {
                    const loggedInUser = localStorage.getItem('loggedInUser');
                    if (loggedInUser && product) {
                        const allOrders = JSON.parse(localStorage.getItem('smartMygoOrders')) || [];
                        const newOrder = {
                            orderId: Date.now(),
                            username: loggedInUser,
                            orderDate: new Date().toLocaleDateString(),
                            product: product
                        };
                        allOrders.push(newOrder);
                        localStorage.setItem('smartMygoOrders', JSON.stringify(allOrders));
                    }
                    document.getElementById('confirmation-overlay').classList.add('show');
                } else {
                    alert('Please fill out all the required details.');
                }
            });
        }
    }

    // ===================================================
    // MY ORDERS PAGE LOGIC (`my-orders.html`)
    // ===================================================
    if (window.location.pathname.includes('my-orders.html')) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const ordersContainer = document.getElementById('orders-list-container');
        if (!loggedInUser) {
            window.location.href = 'login.html';
            return;
        }
        const allOrders = JSON.parse(localStorage.getItem('smartMygoOrders')) || [];
        const userOrders = allOrders.filter(order => order.username === loggedInUser);
        if (userOrders.length === 0) {
            ordersContainer.innerHTML = `<p class="empty-orders-message">You have not placed any orders yet.</p>`;
        } else {
            ordersContainer.innerHTML = userOrders.reverse().map(order => `
                <div class="order-card">
                    <img src="${order.product.imageSrc}" alt="${order.product.name}" class="order-card-image">
                    <div class="order-card-details">
                        <h3>${order.product.name}</h3>
                        <p class="order-card-info"><strong>Price:</strong> Rs. ${order.product.price.toLocaleString('en-IN')}</p>
                        <p class="order-card-info"><strong>Ordered On:</strong> ${order.orderDate}</p>
                        <p class="order-card-info"><strong>Order ID:</strong> ${order.orderId}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // ===================================================
    // REGISTER PAGE LOGIC (`register.html`)
    // ===================================================
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const { username, password, 'confirm-password': confirmPassword } = e.target.elements;
            if (password.value !== confirmPassword.value) {
                showAuthMessage('Passwords do not match!', 'error'); return;
            }
            const users = JSON.parse(localStorage.getItem('smartMygoUsers')) || [];
            if (users.some(user => user.username === username.value)) {
                showAuthMessage('Username already taken!', 'error'); return;
            }
            users.push({ username: username.value, password: password.value });
            localStorage.setItem('smartMygoUsers', JSON.stringify(users));
            showAuthMessage('Registration successful! Redirecting...', 'success');
            setTimeout(() => { window.location.href = 'login.html'; }, 2000);
        });
    }

    // ===================================================
    // LOGIN PAGE LOGIC (`login.html`)
    // ===================================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const { username, password } = e.target.elements;
            const users = JSON.parse(localStorage.getItem('smartMygoUsers')) || [];
            const user = users.find(u => u.username === username.value);
            if (!user) {
                showAuthMessage('User not found!', 'error'); return;
            }
            if (user.password !== password.value) {
                showAuthMessage('Incorrect password!', 'error'); return;
            }
            localStorage.setItem('loggedInUser', user.username);
            showAuthMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                const redirectTo = new URLSearchParams(window.location.search).get('redirectTo');
                window.location.href = redirectTo || 'index.html';
            }, 1500);
        });
    }
});