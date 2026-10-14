package br.com.comunicadornico.entity;
// import

import java.time.LocalDate;

import jakarta.persistence.Entity; //import da variavel data
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuario")
public class entityUsuario {

    // criando a chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    //variaveis
    private String nome;
    private String sexo;
    private String nivelAutismo;
    private LocalDate dataNascAut;
    private boolean voz;

}
