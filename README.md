# TryKar
SPE major project covering the video-call application using react, express-js and webRTC based peer connection.


## To manually create images of each respective service:
1) #### For server:
    sudo docker build -t jaypanchal14/trykar-server .
    <br>
    sudo docker run -p 8000:8000 --name server-container jaypanchal14/trykar-server

2) #### For peer-signaling-server:
    sudo docker build -t jaypanchal14/trykar-signaling-server .
    <br>
    sudo docker run -p 9001:9001 --name signal-container jaypanchal14/trykar-signaling-server

3) #### For client:
    sudo docker build -t jaypanchal14/trykar-client .
    <br>
    sudo docker run -p 3000:3000 --name client-container jaypanchal14/trykar-client

4) #### Test:
    Go to below URL and test the application <br> 
    ```http://localhost:3000```

## To deploy using docker-compose :

#### A) If you have already created the images in your machine, first remove all the respective containers : 

**You can refer "docker-compose-with-created-image.yml" file**
```
<!-- In case you want to up your services -->

(No need to run build command, as we have already created the images)
$ sudo docker-compose build

$ sudo docker-compose up

<!-- In case you want remove the containers -->
$ sudo docker-compose down
```

#### B) If you want to build the images from respective Dockerfile of each services : 
**You can refer "docker-compose.yml"**
```
$ sudo docker-compose up

<!-- In case you want remove the containers -->
$ sudo docker-compose down
```


<br>
To check for elasticsearch : <br>
http://localhost:9200

<br>
To check indices : <br>
http://localhost:9200/_cat/indices