<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
<form id="login-form" class="form" action="LoginServlet" method="post">
    <h1 class="brand-title">E-LUXURY</h1>
    <h2>Log In</h2>
    <input type="text" name="username" id="username" placeholder="Username or Email" required>
    <input type="password" name="password" id="password" placeholder="Password" required>
    <button type="submit" class="button">LOG IN</button>
    <p><a href="Signup.jsp">Don't have an account? Sign up</a></p>

    <%
        String errorMessage = (String) request.getAttribute("errorMessage");
        if (errorMessage != null) {
    %>
    <p class="error-message"><%= errorMessage %></p>
    <%
        }
    %>

</form>
</body>
</html>
