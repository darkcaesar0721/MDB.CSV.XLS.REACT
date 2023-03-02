<?php

namespace controllers;

require __DIR__ . '/../vendor/autoload.php';

require __DIR__ . '/../vendor/ultramsg/whatsapp-php-sdk/ultramsg.class.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request;

class WhatsApp
{
    public $file_path = "db/WhatsApp.json";

    public $init_data = ["default_message" => "", "instance_id" => "", "token" => "", "isWhatsApp" => true];

    public $whatsapp = [];

    public function init()
    {
        if (!file_exists($this->file_path)) {
            $fp = fopen($this->file_path, 'w');
            fwrite($fp, json_encode($this->init_data));
            fclose($fp);
        }
    }

    public function get($return = false)
    {
        $this->set();

        if ($return) {
            return $this->whatsapp;
        } else {
            echo json_encode($this->whatsapp);
            exit;
        }
    }

    public function update()
    {
        $this->set();

        $rows = $_REQUEST['rows'];

        foreach($rows as $key => $value) {
            $this->whatsapp->$key = $value;
        }

        file_put_contents($this->file_path, json_encode($this->whatsapp));
        echo json_encode($this->whatsapp);
        exit;
    }

    public function get_data_by_key($key)
    {
        return $this->whatsapp->$key;
    }

    public function set()
    {
        $this->whatsapp = json_decode(file_get_contents($this->file_path));
    }

    public function set_groups()
    {
        $this->set();

        $token = $this->whatsapp->token;
        $instance_id = $this->whatsapp->instance_id;

        if ($instance_id !== '' && $token !== '') {
            $client = new Client();
            $headers = [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ];
            $params = array(
                'token' => $token
            );
            $request = new Request('GET', 'https://api.ultramsg.com/' . $instance_id . '/groups?' . http_build_query($params), $headers);
            $res = $client->sendAsync($request)->then(function ($response) {
                $this->whatsapp->groups = $response->getBody()->getcontents();
                file_put_contents($this->file_path, json_encode($this->whatsapp));
                echo $this->whatsapp->groups;
            });
            $res->wait();
        }
    }

    public function send($campaign)
    {
        $token = $this->whatsapp->token;
        $instance_id = $this->whatsapp->instance_id;
        $message = $campaign->whatsapp_message;
        $groups = json_decode($this->whatsapp->groups);

        $class = '\ultramsg\WhatsAppApi';
        $client = new $class($token, $instance_id);

        if (($campaign->isWhatsApp === true || $campaign->isWhatsApp === 'true') && $campaign->whatsapp_people !== "" && count($campaign->whatsapp_people) > 0 && $message !== '') {
            foreach($campaign->whatsapp_people as $person) {
                if ($person !== '') {
                    $to = $person;
                    $body = $message;
                    $api = $client->sendChatMessage($to, $body);
                }
            }
        }
        if (($campaign->isWhatsApp === true || $campaign->isWhatsApp === 'true') && $campaign->whatsapp_groups !== "" && count($campaign->whatsapp_groups) > 0 && $message !== '') {
            foreach($campaign->whatsapp_groups as $group) {
                if ($group !== '') {
                    foreach($groups as $g) {
                        if (strpos($g->name, $group) !== false) {
                            $to = $g->id;
                            $body = $message;
                            $api = $client->sendChatMessage($to, $body);
                        }
                    }
                }
            }
        }
    }
}