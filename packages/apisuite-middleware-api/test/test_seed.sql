USE `test`;
INSERT INTO `oauth_client` (`client_id`, `client_secret`, `redirect_uri`, `name`, `description`, `grant_types`, `trusted`, `make_token`, `scope`) VALUES ('cl0ud0k002', 'Sup3rs3cr3tP4SSw0rd', 'http://localhost:3000/handle-code', 'Cloudoki Client No Token', 'Cloudoki OAuth2 Client', 'authorization_code,implicit,password,client_credentials,refresh_token', true, false, '*');
INSERT INTO `user` (`email`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`) VALUES ('test@test.tmp','$2a$10$l7seaIs/j2lkh1wZad0D7.AmWe8Q5mdKlvaApnfxXsQssn55Yd8S.', 'test', 'test', now(), now());
INSERT INTO `oauth_access_token` (`access_token`, `client_id`, `expiration_date`, `scope`, `user_id`) VALUES ('909702bb-1681-402e-a21f-e217849c825d', 'cl0ud0k001', '2017-07-27', '*', 1);
INSERT INTO `oauth_refresh_token` (`client_id`, `expiration_date`, `refresh_token`, `scope`, `user_id`) VALUES ('cl0ud0k001', '2019-12-26', '109d30d7-dd78-45c1-879d-b9e2180ef0fd', '*', 1);
