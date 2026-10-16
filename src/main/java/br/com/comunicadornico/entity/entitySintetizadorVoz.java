package br.com.comunicadornico.entity;

//imports
    import jakarta.persistence.*;
    import lombok.*;

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
