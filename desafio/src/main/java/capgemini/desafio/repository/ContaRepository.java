package capgemini.desafio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import capgemini.desafio.model.Conta;


@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {

}
