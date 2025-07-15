package com.example.cvparser.repository;

import com.example.cvparser.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CvRepository extends JpaRepository<Candidate, Long> {
    // Custom query methods can be defined here if needed
    List<Candidate> findByIdNot(Long id);
} 