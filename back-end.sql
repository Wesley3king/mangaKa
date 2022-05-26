
create table fonte (
i_ind_fonte int primary key auto_increment,
s_nome_fonte varchar(18) not null
);

/*alter table usuario add column s_table_usuario varchar(20) not null;*/

insert into fonte values (0,"mangayabu");
insert into fonte values (2,"mundo manga kun");
select * from fonte;

insert into usuario values (1, "king", "my project", "king00");