package com.example.boxorderserver.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "subsystems")
public class Subsystem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Subsystem name required")
    @Basic(optional = false)
    private String name;
    
    @NotNull(message = "Subdsystem version required")
    @Basic(optional = false)
    private String version;

    public Subsystem(Long id,
		    		@NotNull(message = "Subsystem name required") String name,
		    		@NotNull(message = "Subdsystem version required") String version) {
        this.id = id;
        this.name = name;
        this.version = version;
    }

    public Subsystem() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Subsystem [id=" + id + ", name=" + name + ", version=" + version + "]";
	}

    
}
