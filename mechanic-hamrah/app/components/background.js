// components/Background.js
"use client";

import { useEffect } from "react";
import * as THREE from "three";

const Background = () => {
  useEffect(() => {
    // ایجاد صحنه
    const scene = new THREE.Scene();
    
    // ایجاد دوربین
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // ایجاد رندرر
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // اضافه کردن رندرر به DOM
    document.body.appendChild(renderer.domElement);

    // ایجاد ذرات
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10; // موقعیت تصادفی
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0x888888 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // تابع انیمیشن
    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      // پاکسازی هنگامUnmounting
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null; // این کامپوننت هیچ چیز را به طور مستقیم رندر نمی‌کند.
};

export default Background;
