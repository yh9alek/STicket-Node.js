# Sistema de Tickets de Soporte Técnico con Node.js
<img src="https://raw.githubusercontent.com/yh9alek/miscellaneous/main/src/STicket/imgs/sticket.png">

# Introducción
Un sistema web destinado a empresas que quieran automatizar el proceso de atención de peticiones de soporte técnico.<br>
Fácil de usar e intuitivo.
#
<img src="https://raw.githubusercontent.com/yh9alek/miscellaneous/main/src/STicket/imgs/sticket-useradmin.jpg">

Ante el sistema hay 2 roles:<br>
<ul>
  <li><b>Usuarios:</b> quienes utilizan el servicio, solicitando atención por medio de tickets.</li>
  <li><b>Administradores:</b> los que llevan el seguimiento de los tickets generados, además de gestionar a los usuarios del sistema.</li>
</ul>

# Desarrollo
<img src="https://raw.githubusercontent.com/yh9alek/miscellaneous/main/src/STicket/imgs/sticket-database.jpg" >

Inicialmente se planeó el diseño de la base de datos, tomando en cuenta las entidades más relevantes en el sistema (usuarios, tickets y mensajes).<br>

<b>Estas entidades se relacionan de la siguiente manera:</b>

<ul>
  <li>Un ticket es solicitado por un usuario y atendido por un admin, ambos son usuarios.</li>
  <li>Tanto los usuarios pueden tener más de un ticket solicitado como los admins pueden atender uno o más tickets.</li>
  <li>Cada ticket tiene mensajes, unos son enviados por el usuario y otros por el admin. Es necesario identificar el ticket al que pertencen estos mensajes.</li>
</ul>

De esta manera es posible hacer un sistema de tickets simple, donde la prioridad es atender al usuario y llevar una conversación con él durante el proceso, eso por cada ticket generado ante el sistema.


# Diseño de Interfaz
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-prototype.jpg?raw=true">
Una vez terminado el diseño de la base de datos, ahora era momento de desarrollar la UI que se usaría en el sistema, se buscó que fuese fácil de comprender y manejar por el usuario.
Para el diseño, se tomó como base esta plantilla proporcionada por <a href="https://codecanyon.net/user/tatwerat-team/portfolio">Tatwerat</a>.<br><br>
Pueden ver más sobre el UI concept aquí 👉: <a href="https://codecanyon.net/item/tdesk-helpdesk-boostrap-template/36759805#">TDesk</a>.
<br>
<br>
Todo el diseño y responsive fueron hechos con CSS puro sin frameworks y un poco de javascript para manejar eventos del usuario.

# Fases de programación
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-fases.jpg?raw=true">

El desarrollo de todos los módulos tuvo un periodo de 1 mes.

# Resultado Final
Algunas capturas del sistema:

# Usuario
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-img1.jpg?raw=true">
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-img2.jpg?raw=true">
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-img3.jpg?raw=true">

# Admin
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-img4.jpg?raw=true">
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-img5.jpg?raw=true">
<img src="https://github.com/yh9alek/miscellaneous/blob/main/src/STicket/imgs/sticket-img6.jpg?raw=true">

# Probar 💻
<a href="https://support-ticket-system.netlify.app" >STicket</a>
<p>(Versión preview, la versión completa requiere adquirir un servidor AWS con Node.js)</p>
