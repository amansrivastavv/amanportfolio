---
title: "How the Internet Says “Hello”: Understanding the TCP 3-Way Handshake"
seoTitle: "TCP 3-Way Handshake Explained: How the Internet Says Hello"
seoDescription: "Understand how the TCP 3-way handshake works, why it’s important, and how TCP ensures reliable connections using sequence numbers and ACKs."
datePublished: Sun Jun 29 2025 19:37:43 GMT+0000 (Coordinated Universal Time)
cuid: cmci2nwby000002laey07fa63
slug: how-the-internet-says-hello-understanding-the-tcp-3-way-handshake
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1769332783117/d194b808-67c6-4bf2-8120-8440ea30b2a4.png
tags: web-development, internet, networking, tcp, osi-model

---

Every time you open a website, send a message, or make a video call — your computer says “hello” to another computer on the internet.

But how does this greeting work?

It happens through something called the **TCP 3-Way Handshake** — a small but powerful process that helps establish a **secure and reliable connection** between two machines.

## What is TCP?

**TCP (Transmission Control Protocol)** is one of the main protocols of the internet.  
Its job is to:

* Make sure data is sent and received **correctly**
    
* Handle **packet loss**
    
* Maintain **order**
    
* And ensure a **reliable connection**
    

Before data is transferred, TCP needs to **establish a connection** between client and server — this is where the **3-way handshake** comes in.

## What is the TCP 3-Way Handshake?

The **TCP 3-way handshake** is the process of **establishing a connection** between two computers over a network.

It’s called “3-way” because it involves **three steps**:

1. **SYN** – Client says: “Hey, I want to connect”
    
2. **SYN-ACK** – Server replies: “Sure, I’m ready. You ready?”
    
3. **ACK** – Client confirms: “Yep, let’s go!”
    

Only after this handshake is complete, data can be safely exchanged.

| Step | Message | Who Sends It | Meaning |
| --- | --- | --- | --- |
| 1 | SYN | Client → Server | "I want to start a connection" |
| 2 | SYN + ACK | Server → Client | "Okay. I got your message. Ready?" |
| 3 | ACK | Client → Server | "Cool! Let’s begin sending data" |

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1751225699199/2e024f98-f84a-49ba-b0d4-da0186d54d74.png align="center")

## Why is the Handshake Important?

* ✅ Ensures both sides are **ready** before data transfer
    
* ✅ Allows devices to **exchange initial info** (like sequence numbers)
    
* ✅ Helps in **avoiding data loss or duplication**
    
* ✅ Sets up a **reliable connection** before any real data is sent
    

## How TCP Makes the Connection Reliable

### 🔢 1. **Sequence Numbers**

* Every byte of data has a unique **sequence number**
    
* Helps receiver know the **order of packets**
    

### ✅ 2. **Acknowledgements (ACKs)**

* When receiver gets a packet, it sends back an **ACK** with the next expected sequence number
    
* Ensures sender knows the data arrived **correctly**
    

### 🔄 3. **Retransmission**

* If ACK is not received, TCP **retransmits** the data