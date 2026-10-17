package br.com.comunicadornico.entity;
//imports

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_backupmanager")
public class entityBackUpManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private Long idBackUp;

    // Variaveis(colunas da tabela)
    @Column(name= "caminhoBackup")
    private String caminhoBackUp;

    @Column(name= "dataUltimoBackup")
    private LocalDate dataUltimoBackUp;

    // criando os relacionamentos da tabela
    // relacionamento BackUpManager x Administrador (1..1)
    @OneToOne
    @JoinColumn(name = "fkAdministrador")
    private entityAdministrador administrador;

     // construtor padrao (exigido pelo JPA)
    public entityBackUpManager() {
    }
 
    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityBackUpManager(String caminhoBackUp, LocalDate dataUltimoBackUp) {
        this.caminhoBackUp = caminhoBackUp;
        this.dataUltimoBackUp = dataUltimoBackUp;
    }
 
    public Long getIdBackUp() {
        return idBackUp;
    }
 
    public void setIdBackUp(Long idBackUp) {
        this.idBackUp = idBackUp;
    }
 
    public String getCaminhoBackUp() {
        return caminhoBackUp;
    }
 
    public void setCaminhoBackUp(String caminhoBackUp) {
        this.caminhoBackUp = caminhoBackUp;
    }
 
    public LocalDate getDataUltimoBackUp() {
        return dataUltimoBackUp;
    }
 
    public void setDataUltimoBackUp(LocalDate dataUltimoBackUp) {
        this.dataUltimoBackUp = dataUltimoBackUp;
    }

    // ADICIONADO: getter e setter do administrador
    public entityAdministrador getAdministrador() {
        return administrador;
    }

    public void setAdministrador(entityAdministrador administrador) {
        this.administrador = administrador;
    }
}