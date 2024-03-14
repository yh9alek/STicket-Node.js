# Sistema de Tickets de Soporte Técnico con Node.js
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217653625862492232/image.png?ex=6604cf4f&is=65f25a4f&hm=559cd3ca548c786227859a8687b30c831e92db4e06a036d3f87d566bf12444a4&">

# Introducción
Un sistema web destinado a empresas que quieran automatizar el proceso de atención de peticiones de soporte técnico.<br>
Fácil de usar e intuitivo.
#
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217659519987879976/roles.jpg?ex=6604d4cc&is=65f25fcc&hm=e9cdefdf989130ab50269058cbd9bd497374ecfe50d14f54e71f2c7c68df6866&">

Ante el sistema hay 2 roles:<br>
<ul>
  <li><b>Usuarios:</b> quienes utilizan el servicio, solicitando atención por medio de tickets.</li>
  <li><b>Administradores:</b> los que llevan el seguimiento de los tickets generados, además de gestionar a los usuarios del sistema.</li>
</ul>

# Desarrollo
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217663566295990272/base.jpg?ex=6604d891&is=65f26391&hm=14f0e6b909c31ef0e953e9990a1bf7e21aa89390074b8002142740a2d7d7b75e&" >

Inicialmente se planeó el diseño de la base de datos, tomando en cuenta las entidades más relevantes en el sistema (usuarios, tickets y mensajes).<br>

<b>Estas entidades se relacionan de la siguiente manera:</b>

<ul>
  <li>Un ticket es solicitado por un usuario y atendido por un admin, ambos son usuarios.</li>
  <li>Tanto los usuarios pueden tener más de un ticket solicitado como los admins pueden atender uno o más tickets.</li>
  <li>Cada ticket tiene mensajes, unos son enviados por el usuario y otros por el admin. Es necesario identificar el ticket al que pertencen estos mensajes.</li>
</ul>

De esta manera es posible hacer un sistema de tickets simple, donde la prioridad es atender al usuario y llevar una conversación con él durante el proceso, eso por cada ticket generado ante el sistema.


# Diseño de Interfaz
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217671585859899402/proto.jpg?ex=6604e009&is=65f26b09&hm=4f9a3963c0404fdc9d266baceb6b42a34f6a06a3afbea75845a58388876ed9bc&">
Una vez terminado el diseño de la base de datos, ahora era momento de desarrollar la UI que se usaría en el sistema, se buscó que fuese facil de comprender y manejar por el usuario.
Para el diseño, se tomó como base esta plantilla proporcionada por <a href="https://codecanyon.net/user/tatwerat-team/portfolio">Tatwerat</a>.<br>
Pueden ver más sobre el UI concept aquí 👉: <a href="https://codecanyon.net/item/tdesk-helpdesk-boostrap-template/36759805#">TDesk</a>.
<br>
<br>
Todo el diseño y responsive fueron hechos con CSS puro sin frameworks y un poco de javascript para manejar eventos del usuario.
