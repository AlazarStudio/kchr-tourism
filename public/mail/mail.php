<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $name = $input['fullName'];
    $phone = $input['phone'];
    $email = $input['email'];
    $comment = $input['comment'];

    if ($name != "" && $phone != "" && $email != "" && $comment != "") {
        $subject = "Сообщение от $name";

        $message = "";
        $message .= "Имя: $name\n";
        $message .= "Телефон: $phone\n";
        $message .= "Email: $email\n\n";
        $message .= "Комментарий: $comment\n\n";

        $to = "kchtourism@bk.ru";
        // $to = "";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "При отправке сообщения произошла ошибка."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Пожалуйста, заполните все поля и выберите товары."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Неправильный метод запроса."]);
}
?>