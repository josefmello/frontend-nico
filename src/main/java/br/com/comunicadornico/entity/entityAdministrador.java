package br.com.comunicadornico.entity;
// imports

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//criando tabela
@Entity
@Table(name = "tb_administrador")
public class entityAdministrador {

    //criando chave primária
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdministrador;

    //variaveis
    private String nome;
    private String email;
    private int pin;
    private String telefone;
    private LocalDate dataNasc;
    private String sexo;
    private String senha;
    private boolean premium;
    private float valorMensalidade;
    private LocalDate dataAssinatura;

}
