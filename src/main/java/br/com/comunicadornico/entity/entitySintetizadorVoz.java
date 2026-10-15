package br.com.comunicadornico.entity;

//imports
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
@Table(name = "tb_sintetizadorvoz")
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 

public class entitySintetizadorVoz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSintetizador;

}