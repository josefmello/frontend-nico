package br.com.comunicadornico.entity;
// import

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_usuario") 
@Getter 
@Setter 
@NoArgsConstructor // o construtor vazio que o jpa exige 
@AllArgsConstructor  // o construtor com todos os atributos

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