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
Una vez terminado el diseño de la base de datos, ahora era momento de desarrollar la UI que se usaría en el sistema, se buscó que fuese fácil de comprender y manejar por el usuario.
Para el diseño, se tomó como base esta plantilla proporcionada por <a href="https://codecanyon.net/user/tatwerat-team/portfolio">Tatwerat</a>.<br><br>
Pueden ver más sobre el UI concept aquí 👉: <a href="https://codecanyon.net/item/tdesk-helpdesk-boostrap-template/36759805#">TDesk</a>.
<br>
<br>
Todo el diseño y responsive fueron hechos con CSS puro sin frameworks y un poco de javascript para manejar eventos del usuario.

# Fases de programación
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217704970430976030/modulos.jpg?ex=6604ff20&is=65f28a20&hm=20d9256b2e2b924fe90b4c636b4d33a708c90fcac62bcee4971c31536a5c5334&">

El desarrollo de todos los módulos tuvo un periodo de 1 mes.

# Resultado Final
Algunas capturas del sistema:

# Usuario
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217714425436442735/login.jpg?ex=660507ef&is=65f292ef&hm=91288da1d3688ac3c7a4e82be444f135cbf47d983c016a4216077e12e8a3359e&">
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217710810667810836/ut.jpg?ex=66050491&is=65f28f91&hm=12870154eb794c9ef0572a739de8d3f9cff37bc41adc0985db503db1051d02a1&" >
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217712248273764372/uvt.jpg?ex=660505e7&is=65f290e7&hm=5f66bb14be4bb40525c5276a833583c16d2bb6426bd3cbc04af5b9e436a3be6f&">
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1220563835690287144/up.jpg?ex=660f65a7&is=65fcf0a7&hm=b672325dfe317860eaf69e908e458bce9f5aef38371257dcf7adddac340778ea&">

# Admin
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217715868889518101/at.jpg?ex=66050947&is=65f29447&hm=bb29ef758089e0f1b2fe8e097c29b35bb831ac53a913c8ac1391863bf111f1d7&">
<img src="https://cdn.discordapp.com/attachments/1129195909796860029/1217717298480283709/au.jpg?ex=66050a9c&is=65f2959c&hm=d4907c5277f427a2d3d140850e4f80b16f9375b02e0cfd78e248b95d57dac02d&">

# Probar 💻
<a href="" >STicket</a>
