<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="css/signup.css">
</head>
<body>
<form id="signup-form" class="form" action="SignupServlet" method="post">
    <h1 class="brand-title">E-LUXURY</h1>
    <h2>Sign Up</h2>
    <input type="text" id="username" name="username" placeholder="Username" required>
    <input type="email" id="email" name="email" placeholder="Email" required>
    <input type="password" id="password" name="password" placeholder="Password" required>
    <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm Password" required>
    <button type="submit" class="button">SIGN UP</button>
    <p><a href="Login.jsp">Already have an account? Log in</a></p>


        <%
        String errorMessage = (String) request.getAttribute("errorMessage");
        if (errorMessage != null) {
    %>
    <p style="color: red;"><%= errorMessage %></p>
        <%
        }
    %>
