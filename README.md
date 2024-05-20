# TryKar
SPE major project covering the video-call application using react, express-js and webRTC based peer connection.


## To manually create images of each respective service:
1) #### For server:
    sudo docker build -t trykar-server .
    <br>
    sudo docker run -p 8000:8000 --name server-container trykar-server

2) #### For peer-signaling-server:
    sudo docker build -t trykar-signaling-server .
    <br>
    sudo docker run -p 9001:9001 --name signal-container trykar-signaling-server

3) #### For client:
    sudo docker build -t trykar-client .
    <br>
    sudo docker run -p 3000:3000 --name client-container trykar-client
