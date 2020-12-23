INSERT IGNORE INTO `contenuti_tipo` (`id`, `tipo`, `input_type`, `note`)
VALUES
	(1,'Testo','text',NULL),
	(2,'Numero','number',NULL),
	(3,'Data','date',NULL),
	(4,'Data/Ora','datetime-local',NULL),
	(5,'Email','email',NULL),
	(6,'Blocco di testo',NULL,NULL),
	(7,'Menu', NULL, 'select'),
	(8,'Url','url',NULL),
	-- (9,'Video keyname S3','text',NULL),
	(10,'Immagine',NULL,NULL),
	(11,'Galleria immagini',NULL,NULL),
	(12, 'File', NULL, NULL);



INSERT IGNORE INTO `contenuti_sezione` (`id`, `chiave_sezione`, `sezione`, `intro`)
VALUES
	(1, 'globali', 'Impostazioni globali', NULL);
