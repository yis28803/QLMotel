package com.example.backend.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private List<Message> messages;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private UserAccount customer;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private UserAccount staff;

    public Chat() {
    }

    public Chat(List<Message> messages, Date startTime, Date endTime, UserAccount customer, UserAccount staff) {
        this.messages = messages;
        this.startTime = startTime;
        this.endTime = endTime;
        this.customer = customer;
        this.staff = staff;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public UserAccount getCustomer() {
        return customer;
    }

    public void setCustomer(UserAccount customer) {
        this.customer = customer;
    }

    public UserAccount getStaff() {
        return staff;
    }

    public void setStaff(UserAccount staff) {
        this.staff = staff;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Chat chat)) return false;
        return Objects.equals(getChatId(), chat.getChatId()) && Objects.equals(getMessages(), chat.getMessages()) && Objects.equals(getStartTime(), chat.getStartTime()) && Objects.equals(getEndTime(), chat.getEndTime()) && Objects.equals(getCustomer(), chat.getCustomer()) && Objects.equals(getStaff(), chat.getStaff());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getChatId(), getMessages(), getStartTime(), getEndTime(), getCustomer(), getStaff());
    }

    @Override
    public String toString() {
        return "Chat{" +
                "messages=" + messages +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", customer=" + customer +
                ", staff=" + staff +
                '}';
    }
}
