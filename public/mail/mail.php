<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $name = $input['fullName'] ?? '';
    $phone = $input['phone'] ?? '';
    $email = $input['email'] ?? '';
    $comment = $input['comment'] ?? '';

    $consent = $input['consent'] ?? false;
    $consentDocument = $input['consentDocument'] ?? '';
    $consentVersion = $input['consentVersion'] ?? '';
    $consentUrl = $input['consentUrl'] ?? '';
    $page = $input['page'] ?? '';
    $consentedAt = $input['consentedAt'] ?? '';

    if ($name != "" && $email != "" && $comment != "" && $consent === true) {
        $subject = "Сообщение от $name";

        $message = "";
        $message .= "Имя: $name\n";
        if ($phone != "") {
            $message .= "Телефон: $phone\n";
        }
        $message .= "Email: $email\n\n";
        $message .= "Комментарий: $comment\n\n";
        $message .= "--- Согласие на обработку персональных данных ---\n";
        $message .= "Согласие получено: да\n";
        $message .= "Документ: $consentDocument\n";
        $message .= "Версия текста: $consentVersion\n";
        $message .= "Текст согласия: $consentUrl\n";
        $message .= "Страница: $page\n";
        $message .= "Дата и время согласия: $consentedAt\n";

        $to = "kchtourism@bk.ru";
        // $to = "";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "При отправке сообщения произошла ошибка."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Пожалуйста, заполните обязательные поля и подтвердите согласие на обработку персональных данных."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Неправильный метод запроса."]);
}
?>