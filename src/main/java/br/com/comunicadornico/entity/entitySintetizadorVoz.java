package br.com.comunicadornico.entity;

//imports
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_sintetizadorvoz")
public class entitySintetizadorVoz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSintetizador;

     // construtor padrao (exigido pelo JPA)
    public entitySintetizadorVoz() {
    }
 
    public Long getIdSintetizador() {
        return idSintetizador;
    }
 
    public void setIdSintetizador(Long idSintetizador) {
        this.idSintetizador = idSintetizador;
    }
}