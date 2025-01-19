<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="jakarta.servlet.http.*, jakarta.servlet.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="css/profile.css">
</head>
<body>

<%
    String username = (session != null && session.getAttribute("user") != null)
            ? (String) session.getAttribute("user")
            : "Guest";
    Boolean isNewUser = (session != null && session.getAttribute("isNewUser") != null)
            ? (Boolean) session.getAttribute("isNewUser")
            : false;
%>

<div class="navbar">
    <div class="logo">
        <a href="index.html"><img src="assets/images/e-luxury-logo-hr.png" width="160px"></a>
    </div>
    <nav>
        <ul id="MenuItems">
            <li><a href="index.html">Home</a></li>
            <li><a href='index.html#product'>Products</a></li>
        </ul>
    </nav>
    <a href="cart.html"><img src="assets/images/shopping-bag-icon.png" width="30px" height="30px"></a>
    <a href="profile.jsp"><img src="assets/images/profile-icon.png" width="30px" height="30px"></a>
</div>

<div class="container">
    <div class="sidebar">
        <div class="user-info">
            <img src="assets/images/profile-icon.png" alt="User Avatar" class="avatar">
            <h3 class="username"><%= username %></h3>
            <div class="user-level"><%= isNewUser ? "New Member" : "Regular Member" %></div>
        </div>
    </div>
</div>

<!-- Footer -->
<div class="footer">
    <div class="container">
        <div class="row">
            <div class="footer-col-1">
                <h3>Payment</h3>
                <p>Easily make payments using Touch 'n Go and Online Banking.</p>
                <div class="app-logo">
                    <img src="assets/images/fpx-logo.jpg" alt="FPX Logo">
                    <img src="assets/images/tng.png" alt="Touch n Go Logo">
                </div>
            </div>
            <div class="footer-col-2">
                <img src="assets/images/e-luxury-logo.png" alt="E-Luxury Logo">
                <p>Unlock your creativity with seamless digital downloads – e-books, games, and music, all at your fingertips!</p>
            </div>
            <div class="footer-col-4">
                <h3>Follow Us</h3>
                <ul>
                    <li><a href="https://web.facebook.com/r.php?entry_point=login" target="_blank">Facebook</a></li>
                    <li><a href="https://signup.live.com/?lic=1" target="_blank">Email</a></li>
                    <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
                </ul>
            </div>
        </div>
        <hr>
        <p class="copyright">Copyright © 2025 E-LUXURY. All Rights Reserved</p>
    </div>
</div>

</body>
</html>
