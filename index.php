<?php
include 'db.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $fetched_username, $hashed_password);
    $stmt->fetch();
    
    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        $_SESSION['username'] = $fetched_username; // Store username in session
        header("Location: index.php");
        exit();
    } else {
        echo "<p class='error'>Invalid username or password!</p>";
        
    }
}
?>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CULINARY COMPASS</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="script.js"></script>
</head>
<body>
    
    <header>
        
        <h1>CULINARY COMPASS</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#recipes">Recipes</a></li>
               
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <section id="home">
    <h2>Welcome to CULINARY COMPASS</h2>


        <p>Your ultimate guide to healthy eating and nutritional awareness!

At CULINARY COMPASS, we believe that healthy food should be both delicious and nutritious.</p>
    </section>
    <section id="recipe-detail" style="display: none;">
    </section>
    <button id="back-button" style="display: none;">Back</button>
    
    <section id="recipes">
        <h2>Healthy Recipes</h2>
        <input type="text" id="search" placeholder="Search recipes...">
        <div id="recipe-list"></div>
    </section>
    
  
    <section id="about">
        <h2>About Us</h2>
        <p>At CULINARY COMPASS, we are passionate about making healthy eating simple, delicious, and accessible to everyone. Our mission is to guide you toward nutritious meal choices with easy-to-follow recipes, detailed nutritional values.</p>
    </section>

    <section id="contact">
        <h2>Contact Us</h2>
        <p>Email: support@culinarycompass.com</p>
    </section>

    <footer>
        <p>&copy; 2025 CULINARY COMPASS</p>
    </footer>
</body>
</html>
