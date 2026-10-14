package br.com.comunicadornico.entity;

//imports
import jakarta.persistence.*;

@Entity
@Table(name = "tb_sintetizadorvoz")
public class entitySintetizadorVoz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSintetizador;

    //variaveis
}
